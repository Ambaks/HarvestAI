from sqlalchemy import Column, Integer, String, ForeignKey, Date, Float, Boolean
from sqlalchemy.orm import relationship
from database.base import Base
from datetime import date
import uuid
from sqlalchemy.dialects.postgresql import UUID

class Crop(Base):
    __tablename__ = "crops"

    id = Column(String, primary_key=True, default=lambda:str(uuid.uuid4()))
    farmer_id = Column(String, ForeignKey("users.user_id"), nullable=False)  # The farmer who grew the crop
    crop_name = Column(String, nullable=False)
    quantity = Column(Float, nullable=False)
    date = Column(String, nullable=False)
    quality = Column(String, nullable=True)  # Optional crop quality rating
    harvested = Column(Boolean, nullable = True, default=False)
    status = Column(String, nullable=False, default="Available", server_default="Available")    
    # Relationships
    farmer = relationship("User", foreign_keys=[farmer_id], back_populates="crops")
 
class Harvest(Base):
    __tablename__ = "harvests"

    id = Column(String, primary_key=True, default=lambda:str(uuid.uuid4()))
    farmer_id = Column(String, ForeignKey("users.user_id"), nullable=False) 
    crop_id = Column(String, ForeignKey("crops.id"), nullable=False)
    crop_name = Column(String, nullable=False)
    quantity = Column(Float, nullable=False)
    harvest_date = Column(String, nullable=False)
    quality = Column(String, nullable=True)  # Optional crop quality rating
    status = Column(String, nullable=False, default="Available", server_default="Available") 

    farmer = relationship("User", foreign_keys=[farmer_id], back_populates="harvests")

