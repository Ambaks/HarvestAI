# Define Transaction model
from sqlalchemy import Column, ForeignKey, String, Float
from sqlalchemy.orm import relationship
from database.base import Base
from uuid import UUID, uuid4

class Transaction(Base):
    __tablename__ = "transactions"
    id = Column(String, primary_key=True, default=lambda: str(uuid4()))
    harvest_id = Column(String, ForeignKey("crops.id"))  # Assuming harvests are recorded in the crops table
    farmer_id = Column(String, ForeignKey("users.user_id"))  # Farmers are users
    exporter_id = Column(String, ForeignKey("users.user_id"))  # Exporters are users
    quantity = Column(Float)
    crop_name = Column(String)
    quality = Column(String)
    price_per_kg = Column(Float)
    date = Column(String)
    status = Column(String)
    dollar_amount = Column(Float)

    farmer = relationship("User", foreign_keys=[farmer_id], back_populates="farmer_transactions")
    exporter = relationship("User", foreign_keys=[exporter_id], back_populates="exporter_transactions")