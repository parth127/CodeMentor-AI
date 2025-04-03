from sqlalchemy import Column, String, Text, TIMESTAMP
from sqlalchemy.dialects.postgresql import UUID
import uuid
from sqlalchemy.orm import relationship
from database import Base

class User(Base):
    __tablename__ = 'users'

    id = Column(UUID(as_uuid=True), primary_key=True, default=uuid.uuid4)  # UUID as primary key
    name = Column(String(100), nullable=False)  # Changed from username to name
    email = Column(String(255), unique=True, nullable=False)  # Changed from username to email
    hashed_password = Column(Text, nullable=False)  # Changed from password to hashed_password
    created_at = Column(TIMESTAMP, server_default='CURRENT_TIMESTAMP')  # Added created_at field

    # Add relationships
    conversations = relationship("Conversation", back_populates="user")
    ai_queries = relationship("AIQuery", back_populates="user")