from sqlalchemy import Column, String, Float, ForeignKey, Date
from database.base import Base
from sqlalchemy.orm import relationship
from datetime import datetime



class Earnings(Base):
    __tablename__ = "earnings"

    id = Column(String, primary_key=True, index=True, unique=True)
    user_id = Column(String, ForeignKey("users.user_id"), nullable=False)
    timestamp = Column(Date, default=datetime.now)
    cumulated_earnings = Column(Float, nullable=False)

    farmer = relationship("User", back_populates="earnings")