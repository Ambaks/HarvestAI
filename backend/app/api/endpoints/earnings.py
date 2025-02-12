from fastapi import APIRouter, Depends, HTTPException
from sqlalchemy.orm import Session
from database.session import get_db
from schemas.earnings import Earnings, EarningsOut
from crud.earnings import create_earnings, get_earnings_by_user, get_latest_earning

router = APIRouter()

# Create Earnings Entry
@router.post("/", response_model=EarningsOut)
def add_earnings(earnings: Earnings, db: Session = Depends(get_db)):
    return create_earnings(db, earnings)

# Get all earnings for a user
@router.get("/{user_id}", response_model=list[EarningsOut])
def fetch_earnings(user_id: str, db: Session = Depends(get_db)):
    earnings = get_earnings_by_user(db, user_id)
    if not earnings:
        raise HTTPException(status_code=404, detail="No earnings found for this user")
    return earnings

# Get latest earnings for a user
@router.get("/{user_id}/latest", response_model=EarningsOut)
def fetch_latest_earning(user_id: str, db: Session = Depends(get_db)):
    earning = get_latest_earning(db, user_id)
    if not earning:
        raise HTTPException(status_code=404, detail="No earnings record found")
    return earning
