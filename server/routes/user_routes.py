from fastapi import APIRouter, Depends, HTTPException, status
from sqlalchemy.orm import Session
from models.user_model import User
from utils.auth_utils import create_access_token, get_password_hash, verify_password, decode_token, valid_tokens
from database import get_db
from pydantic import BaseModel
from uuid import UUID
from fastapi.security import OAuth2PasswordBearer
from logger import logger
from typing import Optional

router = APIRouter()
oauth2_scheme = OAuth2PasswordBearer(tokenUrl="login")

class UserResponse(BaseModel):
    id: UUID
    name: str

class RegisterRequest(BaseModel):
    name: str
    email: str
    password: str

class UpdateRequest(BaseModel):
    name: Optional[str] = None
    email: Optional[str] = None
    password: Optional[str] = None

class LoginRequest(BaseModel):
    email: str
    password: str

@router.post("/register", response_model=UserResponse)
def register_user(register_request: RegisterRequest, db: Session = Depends(get_db)):
    # Check if the email already exists
    existing_user = db.query(User).filter(User.email == register_request.email).first()
    if existing_user:
        logger.warning(f"Attempt to register with existing email: {register_request.email}")
        raise HTTPException(
            status_code=status.HTTP_400_BAD_REQUEST,
            detail="Email already registered",
        )

    hashed_password = get_password_hash(register_request.password)
    new_user = User(name=register_request.name, email=register_request.email, hashed_password=hashed_password)
    db.add(new_user)
    db.commit()
    db.refresh(new_user)
    logger.info(f"User registered: {new_user.email}")
    return UserResponse(id=new_user.id, name=new_user.name)

@router.post("/login", response_model=dict)
def login_user(login_request: LoginRequest, db: Session = Depends(get_db)):
    user = db.query(User).filter(User.email == login_request.email).first()
    if not user or not verify_password(login_request.password, user.hashed_password):
        logger.warning(f"Failed login attempt for email: {login_request.email}")
        raise HTTPException(
            status_code=status.HTTP_401_UNAUTHORIZED,
            detail="Invalid credentials",
            headers={"WWW-Authenticate": "Bearer"},
        )
    
    # Create access token with user ID and email
    access_token = create_access_token(data={"email": user.email, "user_id": user.id}, db=db)
    logger.info(f"User logged in: {user.email}")
    
    return {"access_token": access_token, "token_type": "bearer"}

@router.get("/users/me", response_model=UserResponse)
def get_current_user(token: str = Depends(oauth2_scheme), db: Session = Depends(get_db)):
    try:
        # Validate the token and extract email
        email = decode_token(token, db)  # Pass the db session to decode_token

        # Fetch user from the database using the email
        user = db.query(User).filter(User.email == email).first()
        if not user:
            logger.warning("User not found for email: %s", email)
            raise HTTPException(status_code=404, detail="User not found")

        logger.info("Fetched user details for: %s", user.email)
        return UserResponse(id=user.id, name=user.name)
    except Exception as e:
        logger.error("Error fetching user details: %s", str(e))
        raise HTTPException(status_code=500, detail=str(e))

@router.put("/users/me", response_model=UserResponse)
def update_user_profile(update_request: UpdateRequest, db: Session = Depends(get_db), token: str = Depends(oauth2_scheme)):
    email = decode_token(token)
    user = db.query(User).filter(User.email == email).first()
    if not user:
        logger.warning(f"User not found for token: {token}")
        raise HTTPException(status_code=status.HTTP_404_NOT_FOUND, detail="User not found")

    # Update user details only if provided
    if update_request.name is not None:
        user.name = update_request.name
    if update_request.email is not None:
        user.email = update_request.email  # Ensure the new email is unique
    if update_request.password is not None:
        user.hashed_password = get_password_hash(update_request.password)  # Update hashed password

    db.commit()
    db.refresh(user)
    logger.info(f"Updated user profile for: {user.email}")
    return UserResponse(id=user.id, name=user.name)

@router.delete("/users/me")
def delete_user_account(db: Session = Depends(get_db), token: str = Depends(oauth2_scheme)):
    email = decode_token(token)
    user = db.query(User).filter(User.email == email).first()
    if not user:
        logger.warning(f"User not found for token: {token}")
        raise HTTPException(status_code=status.HTTP_404_NOT_FOUND, detail="User not found")

    db.delete(user)
    db.commit()
    logger.info(f"Deleted user account for: {user.email}")
    return {"detail": "User account deleted successfully"}

@router.get("/users")
def read_users(db: Session = Depends(get_db)):
    users = db.query(User).all()
    logger.info("Fetched all users")
    return users
