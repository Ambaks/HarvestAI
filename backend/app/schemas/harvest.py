# Define Harvest schemas
from uuid import UUID
from pydantic import BaseModel
from typing import Optional

class CropBase(BaseModel):
    farmer_id: str
    crop_name: str
    quantity: float
    quality: str
    date: str
    

class HarvestBase(BaseModel):
    crop_name: str
    farmer_id: str
    crop_id: str
    quantity: float
    quality: str
    harvest_date: str
    status: str

class HarvestOut(HarvestBase):
    id: str

class HarvestCreate(CropBase):
    id: UUID

class CropRead(CropBase):
    id: UUID
    status: str

    class Config:
        orm_mode = True

class HarvestUpdate(BaseModel):
    quantity: Optional[float] = None
    date: Optional[str] = None
    quality: str | None = None
    crop_name: str | None = None
    status: str | None = None

