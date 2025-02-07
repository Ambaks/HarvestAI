# Define Farmer model
from sqlalchemy import Column, Integer, String
from database.base import Base

class Farmer(Base):
    __tablename__ = "farmers"
    id = Column(Integer, primary_key=True, index=True)
    name = Column(String, index=True)
    location = Column(String)