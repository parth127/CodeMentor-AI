import logging
from fastapi import APIRouter, HTTPException, Depends, BackgroundTasks
from fastapi.responses import StreamingResponse
from pydantic import BaseModel
from sqlalchemy.orm import Session
from fastapi.security import OAuth2PasswordBearer
from utils.gemini_model import generate_gemini_response_model, generate_gemini_response_stream  # Import the Gemini response function and stream function
from utils.auth_utils import decode_token  # Import the token decoding function
from database import get_db  # Import the function to get the database session
from models.user_model import User  # Import the User model
from models.ai_query_model import AIQuery, AIQueryResponse  # Import the AIQuery model and the Pydantic model
from logger import logger
from models.conversations_model import Conversation  # Import the Conversation model
from uuid import UUID
from typing import List, AsyncGenerator
import json
import asyncio

# Define the OAuth2 scheme
oauth2_scheme = OAuth2PasswordBearer(tokenUrl="login")  # Adjust the token URL as needed

router = APIRouter()

class GenerateRequest(BaseModel):
    prompt: str
    conversation_id: UUID  # Include conversation_id in the request model

async def generate_stream_response(prompt: str, conversation_id: UUID, user_id: UUID, db: Session) -> AsyncGenerator[str, None]:
    try:
        # Start the response with a newline to ensure proper streaming
        yield "data: {\"type\": \"start\"}\n\n"

        # Initialize complete response
        complete_response = ""

        # Stream the AI response
        async for chunk in generate_gemini_response_stream(prompt):
            complete_response += chunk
            yield f"data: {json.dumps({'type': 'chunk', 'content': chunk})}\n\n"

        # Store the complete response in the database
        ai_query = AIQuery(
            user_id=user_id,
            conversation_id=conversation_id,
            query=prompt,
            response=complete_response
        )
        db.add(ai_query)
        db.commit()  # Remove await since we're using synchronous SQLAlchemy

        yield "data: {\"type\": \"end\"}\n\n"
    except Exception as e:
        logger.error(f"Error in generate_stream_response: {str(e)}")
        yield f"data: {json.dumps({'type': 'error', 'content': str(e)})}\n\n"

@router.post("/generate")
async def generate_response(
    generate_request: GenerateRequest,
    background_tasks: BackgroundTasks,
    token: str = Depends(oauth2_scheme),
    db: Session = Depends(get_db)
):
    try:
        logger.info(f"Received generate request for conversation: {generate_request.conversation_id}")
        email = decode_token(token, db)
        user = db.query(User).filter(User.email == email).first()
        if not user:
            raise HTTPException(status_code=404, detail="User not found.")

        logger.info(f"Starting streaming response for user: {user.id}")
        return StreamingResponse(
            generate_stream_response(
                generate_request.prompt,
                generate_request.conversation_id,
                user.id,
                db
            ),
            media_type="text/event-stream"
        )
    except Exception as e:
        logger.error(f"Error in generate_response: {str(e)}")
        raise HTTPException(status_code=500, detail=str(e))

# New route to fetch user's AI history
@router.get("/history", response_model=list[AIQueryResponse])
def get_ai_history(token: str = Depends(oauth2_scheme), db: Session = Depends(get_db)):
    try:
        email = decode_token(token, db)
        user = db.query(User).filter(User.email == email).first()
        if user is None:
            raise HTTPException(status_code=404, detail="User not found.")

        user_id = user.id
        history = db.query(AIQuery).filter(AIQuery.user_id == user_id).all()

        # Convert the history to AIQueryResponse objects
        return [AIQueryResponse.from_orm(query) for query in history]  # Use from_orm to convert
    except Exception as e:
        logger.error("Error fetching AI history: %s", str(e))
        raise HTTPException(status_code=500, detail=str(e))

# New endpoint to fetch messages for a specific conversation
@router.get("/conversations/{conversation_id}/messages", response_model=List[AIQueryResponse])  # Use AIQueryResponse
def get_messages(conversation_id: UUID, token: str = Depends(oauth2_scheme), db: Session = Depends(get_db)):
    email = decode_token(token, db)
    
    user = db.query(User).filter(User.email == email).first()
    if not user:
        raise HTTPException(status_code=404, detail="User not found.")

    # Check if the conversation belongs to the user
    conversation = db.query(Conversation).filter(Conversation.id == conversation_id, Conversation.user_id == user.id).first()
    if not conversation:
        raise HTTPException(status_code=404, detail="Conversation not found.")

    # Fetch messages for the conversation
    messages = db.query(AIQuery).filter(AIQuery.conversation_id == conversation_id).all()
    return [AIQueryResponse.from_orm(message) for message in messages]  # Convert to Pydantic model
