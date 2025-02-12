# Define Transaction schemas
from pydantic import BaseModel

class TransactionBase(BaseModel):
    harvest_id: str
    farmer_id: str
    exporter_id: str
    quantity: float
    quality: str
    crop_name: str
    price_per_kg: float
    status: str
    dollar_amount: float
    date: str
    

class TransactionCreate(TransactionBase):
    id: str


class TransactionRead(TransactionBase):
    id: str

    class Config:
        orm_mode = True