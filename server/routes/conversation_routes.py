from fastapi import APIRouter, Depends, HTTPException
from sqlalchemy.orm import Session
from models.conversations_model import Conversation, ConversationBase
from models.user_model import User
from database import get_db
from fastapi.security import OAuth2PasswordBearer
from utils.auth_utils import decode_token  # Import the token decoding function
from typing import Optional, List  # Import List for response model
from uuid import UUID
from pydantic import BaseModel  # Ensure BaseModel is imported

router = APIRouter()
oauth2_scheme = OAuth2PasswordBearer(tokenUrl="login")  # Define the OAuth2 scheme

class CreateConversationRequest(BaseModel):
    title: Optional[str] = None  # Make title optional

@router.post("/", response_model=ConversationBase)  # Change this to use ConversationBase
def create_conversation(conversation_request: CreateConversationRequest, token: str = Depends(oauth2_scheme), db: Session = Depends(get_db)):
    # Decode the token to get the user email
    email = decode_token(token, db)
    
    # Check if the user exists
    user = db.query(User).filter(User.email == email).first()
    if not user:
        raise HTTPException(status_code=404, detail="User not found.")

    new_conversation = Conversation(user_id=user.id, title=conversation_request.title)
    db.add(new_conversation)
    db.commit()
    db.refresh(new_conversation)
    return ConversationBase.from_orm(new_conversation)  # Convert to Pydantic model before returning

@router.get("/", response_model=List[ConversationBase])  # Use the Pydantic model here
def get_user_conversations(token: str = Depends(oauth2_scheme), db: Session = Depends(get_db)):
    # Decode the token to get the user email
    email = decode_token(token, db)
    
    # Check if the user exists
    user = db.query(User).filter(User.email == email).first()
    if not user:
        raise HTTPException(status_code=404, detail="User not found.")

    # Fetch all conversations for the user
    conversations = db.query(Conversation).filter(Conversation.user_id == user.id).all()
    return [ConversationBase.from_orm(conv) for conv in conversations]  # Convert to list of Pydantic models
