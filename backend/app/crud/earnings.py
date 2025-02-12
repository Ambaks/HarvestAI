from sqlalchemy.orm import Session
from models.earnings import Earnings
from schemas.earnings import EarningsOut
import uuid
from datetime import datetime

# Create Earnings Entry
def create_earnings(db: Session, earnings_data: Earnings):
    new_earning = Earnings(
        id=str(uuid.uuid4()),  # Generate a unique ID
        user_id=earnings_data.user_id,
        cumulated_earnings=earnings_data.cumulated_earnings,
        timlestamp = datetime.now()
    )
    db.add(new_earning)
    db.commit()
    db.refresh(new_earning)
    return new_earning

# Get all earnings for a specific user
def get_earnings_by_user(db: Session, user_id: str):
    return db.query(Earnings).filter(Earnings.user_id == user_id).all()

# Get latest earnings entry for a user
def get_latest_earning(db: Session, user_id: str):
    return (db.query(Earnings).filter(Earnings.user_id == user_id).order_by(Earnings.timestamp.desc()).first())

# Delete Earnings Entry (optional)
def delete_earnings(db: Session, earnings_id: str):
    earning = db.query(Earnings).filter(Earnings.id == earnings_id).first()
    if earning:
        db.delete(earning)
        db.commit()
    return earning
