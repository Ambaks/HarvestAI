from http.client import HTTPException
from typing import Any, Dict, List
from sqlalchemy.orm import Session
from models.earnings import Earnings
from schemas.earnings import EarningsOut, EarningsCreate
import uuid
from datetime import datetime


# Create Earnings Entry
def create_earnings(db: Session, earnings_data: Earnings):
    new_earning = EarningsCreate(
        id=str(uuid.uuid4()),  # Generate a unique ID
        user_id=earnings_data.user_id,
        cumulated_earnings=earnings_data.cumulated_earnings,
        timestamp = datetime.now()
    )
    db.add(new_earning)
    db.commit()
    db.refresh(new_earning)
    return new_earning

# Get all earnings for a specific user
def get_earnings_by_user(db: Session, user_id: str) -> List[Earnings]:
    print(f"Querying earnings for user_id: {user_id}")
    earnings = db.query(Earnings).filter(Earnings.user_id == user_id).all()
    print(f"Earnings found: {earnings}")
    for earning in earnings:
        if isinstance(earning.timestamp, datetime):
            earning.timestamp = earning.timestamp.isoformat()

    return earnings

    
# Get latest earnings entry for a user
def get_earning(db: Session, earning_id: str):
    return (db.query(Earnings).filter(Earnings.id == earning_id).first())

# Update Earning
def update_earning(db: Session, earning: Earnings, update_data: Dict[str, Any]):
    if not earning:
        raise HTTPException(status_code=404, detail="User not found")

    # Ensure only valid columns are updated
    valid_keys = {column.name for column in Earnings.__table__.columns}
    update_data = {k: v for k, v in update_data.items() if k in valid_keys and v is not None}

    for key, value in update_data.items():
        setattr(earning, key, value)  # Dynamically update fields

    db.commit()
    db.refresh(earning)  # Refresh to get updated data from DB
    return earning


# Delete Earnings Entry (optional)
def delete_earnings(db: Session, earnings_id: str):
    earning = db.query(Earnings).filter(Earnings.id == earnings_id).first()
    if earning:
        db.delete(earning)
        db.commit()
    return earning
