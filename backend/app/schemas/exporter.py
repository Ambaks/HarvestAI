# Define Exporter schemas
import uuid
from pydantic import BaseModel

class ExporterBase(BaseModel):
    name: str
    company: str

class ExporterCreate(ExporterBase):
    pass

class ExporterRead(ExporterBase):
    id: int

    class Config:
        orm_mode = True