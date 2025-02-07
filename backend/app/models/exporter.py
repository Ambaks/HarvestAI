# Define Exporter model
from sqlalchemy import Column, Integer, String
from database.base import Base

class Exporter(Base):
    __tablename__ = "exporters"
    id = Column(Integer, primary_key=True, index=True)
    name = Column(String, index=True)
    company = Column(String)