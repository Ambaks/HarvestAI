# Define Exporter schemas
import uuid
from pydantic import BaseModel

class FarmerBase(BaseModel):
    name: str
    location: str

class FarmerCreate(FarmerBase):
    pass

class FarmerRead(FarmerBase):
    id: int

    class Config:
        orm_mode = True