from sqlalchemy import Column, String, Float, ForeignKey, DateTime
from database.base import Base
from sqlalchemy.orm import relationship
from datetime import datetime
import uuid




class Earnings(Base):
    __tablename__ = "earnings"

    id = Column(String, primary_key=True, default= lambda: str(uuid.uuid4()))    
    user_id = Column(String, ForeignKey("users.user_id"), nullable=False)
    timestamp = Column(DateTime, default= lambda: datetime.now())
    cumulated_earnings = Column(Float, nullable=False)

    user = relationship("User", back_populates="earnings")