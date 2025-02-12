# Define Harvest schemas
from pydantic import BaseModel
from typing import Optional

class HarvestBase(BaseModel):
    id: int
    farmer_id: int
    crop_name: str
    quantity: float
    quality: str
    buyer_id: int
    date: str
    quantity: int

class HarvestCreate(HarvestBase):
    pass

class HarvestRead(HarvestBase):
    id: int

    class Config:
        orm_mode = True

class HarvestUpdate(BaseModel):
    quantity: Optional[int] = None
    date: Optional[str] = None

