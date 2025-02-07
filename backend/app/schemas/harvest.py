# Define Harvest schemas
from pydantic import BaseModel
from typing import Optional

class HarvestBase(BaseModel):
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

