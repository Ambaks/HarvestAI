# Define Transaction schemas
from pydantic import BaseModel

class TransactionBase(BaseModel):
    harvest_id: int
    farmer_id: int
    exporter_id: int
    amount: int

class TransactionCreate(TransactionBase):
    pass

class TransactionRead(TransactionBase):
    id: int

    class Config:
        orm_mode = True