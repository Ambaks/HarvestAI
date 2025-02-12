from sqlalchemy import Column, Integer, String, ForeignKey, Date, Float
from sqlalchemy.orm import relationship
from database.base import Base
from datetime import date

class Crop(Base):
    __tablename__ = "crops"

    id = Column(Integer, primary_key=True, index=True, autoincrement=True)
    farmer_id = Column(String, ForeignKey("users.user_id"), nullable=False)  # The farmer who grew the crop
    crop_name = Column(String, nullable=False)
    quantity = Column(Float, nullable=False)
    date = Column(String, nullable=False)
    quality = Column(String, nullable=True)  # Optional crop quality rating
    
    # Relationships
    farmer = relationship("User", foreign_keys=[farmer_id], back_populates="crops")
 


