from sqlalchemy import Column, Text, TIMESTAMP, ForeignKey
from sqlalchemy.dialects.postgresql import UUID
from sqlalchemy.orm import relationship
from database import Base
import uuid
from pydantic import BaseModel
from datetime import datetime

class AIQuery(Base):
    __tablename__ = "ai_queries"

    id = Column(UUID(), primary_key=True, default=uuid.uuid4)
    user_id = Column(UUID(), ForeignKey("users.id"), nullable=False)
    conversation_id = Column(UUID(), ForeignKey("conversations.id"), nullable=False)
    query = Column(Text, nullable=False)  # This represents the message text
    response = Column(Text, nullable=True)  # This can represent the AI's response
    created_at = Column(TIMESTAMP, server_default='CURRENT_TIMESTAMP')

    # Define relationships
    user = relationship("User", back_populates="ai_queries")
    conversation = relationship("Conversation", back_populates="ai_queries")

class AIQueryResponse(BaseModel):
    id: uuid.UUID
    user_id: uuid.UUID
    conversation_id: uuid.UUID
    query: str
    response: str
    created_at: datetime

    class Config:
        orm_mode = True
        from_attributes = True  # Enable from_orm functionality
