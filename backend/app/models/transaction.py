# Define Transaction model
from sqlalchemy import Column, Integer, ForeignKey
from sqlalchemy.orm import relationship
from database.base import Base

class Transaction(Base):
    __tablename__ = "transactions"
    id = Column(Integer, primary_key=True, index=True)
    harvest_id = Column(Integer, ForeignKey("harvests.id"))
    farmer_id = Column(Integer, ForeignKey("farmers.id"))
    exporter_id = Column(Integer, ForeignKey("exporters.id"))
    amount = Column(Integer)

    crop = relationship("Harvest")
    farmer = relationship("Farmer")
    exporter = relationship("Exporter")