# Define Harvest schemas
from uuid import UUID
from pydantic import BaseModel
from typing import Optional

class HarvestBase(BaseModel):
    farmer_id: str
    crop_name: str
    quantity: float
    quality: str
    date: str

class HarvestCreate(HarvestBase):
    id: UUID

class HarvestRead(HarvestBase):
    id: UUID

    class Config:
        orm_mode = True

class HarvestUpdate(BaseModel):
    quantity: Optional[float] = None
    date: Optional[str] = None
    quality: str | None = None
    crop_name: str | None = None

