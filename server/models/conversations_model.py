from sqlalchemy import Column, String, TIMESTAMP, ForeignKey
from sqlalchemy.dialects.postgresql import UUID  # Use PostgreSQL UUID
from sqlalchemy.orm import relationship
from database import Base  # Assuming you have a Base class for your models
from pydantic import BaseModel, ConfigDict
from datetime import datetime
from typing import Optional
import uuid

class Conversation(Base):
    __tablename__ = "conversations"

    id = Column(UUID(), primary_key=True, default=uuid.uuid4)  # UUID as primary key
    user_id = Column(UUID(), ForeignKey("users.id"), nullable=False)
    title = Column(String, nullable=True)  # Optional: Chat title
    created_at = Column(TIMESTAMP, server_default='CURRENT_TIMESTAMP')  # Timestamp for creation

    user = relationship("User", back_populates="conversations")  # Assuming you have a User model
    ai_queries = relationship("AIQuery", back_populates="conversation")  # Relationship to AIQuery

class ConversationBase(BaseModel):
    id: uuid.UUID  # Use UUID from the uuid module
    user_id: uuid.UUID  # Use UUID from the uuid module
    title: Optional[str]  # Use Optional instead of str | None
    created_at: datetime

    # Update the config to use from_attributes instead of orm_mode
    model_config = ConfigDict(from_attributes=True)
