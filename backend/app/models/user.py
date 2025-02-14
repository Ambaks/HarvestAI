from models.orders import Order
from sqlalchemy import Column, String
from database.base import Base
from sqlalchemy.orm import relationship


class User(Base):
    __tablename__ = "users"

    user_id = Column(String, primary_key=True, index=True, unique=True)
    first_name = Column(String, unique=False, index=False, nullable=False)
    last_name = Column(String, unique=False, index=False, nullable=False)
    email = Column(String, unique=True, index=False, nullable=False)
    hashed_password = Column(String, nullable=False)
    phone = Column(String, nullable=True)
    dob = Column(String, nullable=True)
    role = Column(String, unique=False, index=False, nullable=False)

    from models.earnings import Earnings  
    exporter_orders = relationship("Order", foreign_keys=[Order.exporter_id], back_populates="exporter")
    farmer_orders = relationship("Order", foreign_keys=[Order.farmer_id], back_populates="farmer")
    
    earnings = relationship("Earnings", back_populates="user", cascade="all, delete-orphan")
    crops = relationship("Crop", back_populates="farmer", cascade="all, delete-orphan")
    farmer_transactions = relationship("Transaction", foreign_keys="[Transaction.farmer_id]", back_populates="farmer")
    exporter_transactions = relationship("Transaction", foreign_keys="[Transaction.exporter_id]", back_populates="exporter")


