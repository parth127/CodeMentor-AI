from sqlalchemy import Column, ForeignKey, TEXT, TIMESTAMP
from sqlalchemy.dialects.postgresql import UUID
from sqlalchemy.orm import relationship
from database import Base  # Assuming you have a Base class for your models

class ValidToken(Base):
    __tablename__ = "valid_tokens"

    id = Column(UUID, primary_key=True, server_default="gen_random_uuid()")
    user_id = Column(UUID, ForeignKey("users.id"), nullable=False)
    token = Column(TEXT, nullable=False)
    expires_at = Column(TIMESTAMP, nullable=False)

    user = relationship("User")  # Assuming you have a User model
