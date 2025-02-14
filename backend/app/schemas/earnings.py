import uuid
from pydantic import BaseModel, field_serializer
from datetime import datetime
from datetime import date

class Earnings(BaseModel):
    user_id: str
    cumulated_earnings: float

class EarningsOut(Earnings):
    id: str | None = None
    timestamp: datetime | str | None = None

    @field_serializer("timestamp")
    def serialize_timestamp(self, value) -> str | None:
        if isinstance(value, datetime):
            return value.isoformat()  # Convert datetime to ISO string
        return value  # Return as is if it's already a string

class EarningsUpdate(BaseModel):
    user_id: str | None = None
    cumulated_earnings: float | None = None
    timestamp: date | None = None

class EarningsCreate(Earnings):
    id: str
    timestamp: str