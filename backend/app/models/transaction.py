# Define Transaction model
from sqlalchemy import Column, Integer, ForeignKey, String, Float
from sqlalchemy.orm import relationship
from database.base import Base

class Transaction(Base):
    __tablename__ = "transactions"
    id = Column(Integer, primary_key=True, index=True)
    harvest_id = Column(Integer, ForeignKey("crops.id"))  # Assuming harvests are recorded in the crops table
    farmer_id = Column(String, ForeignKey("users.user_id"))  # Farmers are users
    exporter_id = Column(String, ForeignKey("users.user_id"))  # Exporters are users
    amount = Column(Integer)
    quality = Column(String)
    dollar_amount = Column(Float)

    farmer = relationship("User", foreign_keys=[farmer_id], back_populates="farmer_transactions")
    exporter = relationship("User", foreign_keys=[exporter_id], back_populates="exporter_transactions")