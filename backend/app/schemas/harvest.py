# Define Harvest schemas
from uuid import UUID
from pydantic import BaseModel, UUID4
from typing import Optional
from datetime import date

class HarvestBase(BaseModel):
    farmer_id: str
    crop_name: str
    quantity: float
    quality: str
    date: str

class HarvestCreate(HarvestBase):
    id: int

class HarvestRead(HarvestBase):
    id: UUID4

    class Config:
        orm_mode = True

class HarvestUpdate(BaseModel):
    quantity: Optional[int] = None
    date: Optional[str] = None
    quality: str | None = None

