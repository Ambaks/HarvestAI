# Define Harvest model
from sqlalchemy import Column, Integer, String, Date
from database.base import Base

class Harvest(Base):
    __tablename__ = "harvests"
    id = Column(Integer, primary_key=True, index=True)
    date = Column(Date, index=True)
    quantity = Column(Integer)

