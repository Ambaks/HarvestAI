from sqlalchemy import Column, Integer, String, ForeignKey, Date, Float, Boolean, DateTime
from sqlalchemy.orm import relationship
from database.base import Base
from datetime import datetime, timezone
import uuid
from sqlalchemy.dialects.postgresql import UUID

class Crop(Base):
    __tablename__ = "crops"

    id = Column(String, primary_key=True, default=lambda: str(uuid.uuid4()))
    farmer_id = Column(String, ForeignKey("users.user_id"), nullable=False)  # The farmer who grew the crop
    crop_name = Column(String, nullable=False)
    quantity = Column(Float, nullable=False)
    date = Column(String, nullable=False)
    quality = Column(String, nullable=True)  # Optional crop quality rating
    harvested = Column(Boolean, nullable = True, default=False)
    status = Column(String, nullable=False, default="Available", server_default="Available")  

    # Relationships
    farmer = relationship("User", foreign_keys=[farmer_id], back_populates="crops")
    exporters = relationship("ExporterCrop", back_populates="crop", cascade="all, delete-orphan")
    harvests = relationship("Harvest", back_populates="crop", cascade="all, delete-orphan")

class Harvest(Base):
    __tablename__ = "harvests"

    id = Column(String, primary_key=True, default=lambda: str(uuid.uuid4()))
    farmer_id = Column(String, ForeignKey("users.user_id"), nullable=False)
    crop_id = Column(String, ForeignKey("crops.id"), nullable=False)
    crop_name = Column(String, nullable=False)
    quantity = Column(Float, nullable=False)
    harvest_date = Column(String, nullable=False)
    quality = Column(String, nullable=True)  # Optional crop quality rating
    status = Column(String, nullable=False, default="Available", server_default="Available")

    farmer = relationship("User", foreign_keys=[farmer_id], back_populates="harvests")
    crop = relationship("Crop", foreign_keys=[crop_id], back_populates="harvests")

class ExporterCrop(Base):
    __tablename__ = "exporter_crops"

    id = Column(String, primary_key=True, default=lambda: str(uuid.uuid4()))
    exporter_id = Column(String, ForeignKey("users.user_id"), nullable=False)  
    crop_id = Column(String, ForeignKey("crops.id"), nullable=False)
    status = Column(String, nullable=False, default="Pending", server_default="Pending")
    assigned_at = Column(DateTime, default=lambda: datetime.now(timezone.utc))  # Timestamp for assignment

    exporter = relationship("User", foreign_keys=[exporter_id], back_populates="assigned_crops")
    crop = relationship("Crop", foreign_keys=[crop_id], back_populates="exporters")