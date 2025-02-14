from sqlalchemy import Column, String, Date, DateTime, Float, ForeignKey
from database.base import Base
from sqlalchemy.orm import relationship
import uuid
from datetime import datetime

class Order(Base):
    __tablename__ = "orders"

    id = Column(String, primary_key=True, default=str(uuid.uuid4()))
    crop_name = Column(String)
    price_per_kg = Column(Float)
    exporter_id = Column(String, ForeignKey("users.user_id"), nullable=False)  # Who placed the order
    farmer_id = Column(String, ForeignKey("users.user_id"), nullable=False)    # Who receives the order
    quantity = Column(Float, nullable=False)
    status = Column(String, default="Pending")  # Pending, Accepted, Declined
    due_date = Column(String, nullable=False)
    timestamp = Column(DateTime, default=lambda:datetime.now)

    # Relationships
    exporter = relationship("User", foreign_keys=[exporter_id], back_populates="exporter_orders")
    farmer = relationship("User", foreign_keys=[farmer_id], back_populates="farmer_orders")

