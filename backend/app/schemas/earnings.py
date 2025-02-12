import uuid
from pydantic import BaseModel



class Earnings(BaseModel):
    user_id: str
    cumulated_earnings: float

class EarningsOut(Earnings):
    id: str
    timestamp: str