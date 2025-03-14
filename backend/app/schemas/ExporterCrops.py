from pydantic import BaseModel
from typing import Optional
from datetime import datetime

class ExporterCropBase(BaseModel):
    exporter_id: str
    crop_id: str
    status: Optional[str] = "Pending"

class ExporterCropCreate(ExporterCropBase):
    pass

class ExporterCropUpdate(BaseModel):
    status: str

class ExporterCropResponse(ExporterCropBase):
    id: str
    assigned_at: datetime

    class Config:
        from_attributes = True