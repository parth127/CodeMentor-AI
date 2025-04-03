from datetime import datetime, timedelta
from typing import Optional, Dict
from jose import JWTError, jwt
from passlib.context import CryptContext
from fastapi import HTTPException, status
from sqlalchemy.orm import Session
from models.valid_token_model import ValidToken  # Import the ValidToken model
from uuid import UUID

# Secret key for JWT encoding and decoding
SECRET_KEY = "Nchn8zj11dqadVApaNFoIjrLOl5HeLcfIaEJ/UP6Wr0="  # Change this to a secure random key
ALGORITHM = "HS256"
ACCESS_TOKEN_EXPIRE_MINUTES = 7 * 24 * 60  # Set to 7 days

# Password hashing context
pwd_context = CryptContext(schemes=["bcrypt"], deprecated="auto")

# Dictionary to store valid tokens for users
valid_tokens: Dict[str, str] = {}

def verify_password(plain_password: str, hashed_password: str) -> bool:
    return pwd_context.verify(plain_password, hashed_password)

def get_password_hash(password: str) -> str:
    return pwd_context.hash(password)

def create_access_token(data: dict, db: Session, expires_delta: Optional[timedelta] = None) -> str:
    print("data", data)
    to_encode = data.copy()
    if expires_delta:
        expire = datetime.utcnow() + expires_delta
    else:
        expire = datetime.utcnow() + timedelta(minutes=ACCESS_TOKEN_EXPIRE_MINUTES)
    to_encode.update({"exp": expire})

    # Ensure user_id is included in the token data
    user_id = data.get("user_id")
    if isinstance(user_id, UUID):  # Check if user_id is a UUID
        to_encode["user_id"] = str(user_id)  # Convert UUID to string
    else:
        to_encode["user_id"] = user_id  # Keep it as is if it's already a string

    to_encode["sub"] = data.get("email")  # Store email in the 'sub' claim

    # Delete existing token if it exists
    existing_token = db.query(ValidToken).filter(ValidToken.user_id == user_id).first()
    if existing_token:
        db.delete(existing_token)  # Delete the existing token
        db.commit()  # Commit the transaction to save the changes

    encoded_jwt = jwt.encode(to_encode, SECRET_KEY, algorithm=ALGORITHM)

    # Store the new token in the valid_tokens table
    valid_token = ValidToken(user_id=user_id, token=encoded_jwt, expires_at=expire)
    db.add(valid_token)
    db.commit()

    return encoded_jwt

def decode_access_token(token: str) -> dict:
    try:
        payload = jwt.decode(token, SECRET_KEY, algorithms=[ALGORITHM])
        return payload
    except JWTError:
        return {}

def decode_token(token: str, db: Session) -> str:
    try:
        payload = jwt.decode(token, SECRET_KEY, algorithms=[ALGORITHM])
        email = payload.get("sub")  # Assuming the email is stored in the 'sub' claim
        
        # Check if the token is valid in the database
        valid_token = db.query(ValidToken).filter(ValidToken.token == token).first()
        if valid_token and valid_token.expires_at > datetime.utcnow():
            return email  # Return the email
        else:
            raise HTTPException(status_code=status.HTTP_401_UNAUTHORIZED, detail="Token is invalid")
        
    except JWTError:
        raise HTTPException(status_code=status.HTTP_401_UNAUTHORIZED, detail="Invalid token")
