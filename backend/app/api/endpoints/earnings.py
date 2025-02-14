from typing import Any, Dict
from fastapi import APIRouter, Depends, HTTPException, Query
from sqlalchemy.orm import Session
from api.dependencies import get_db
from schemas.earnings import Earnings, EarningsOut, EarningsUpdate
from crud.earnings import create_earnings, get_earnings_by_user, get_earning, update_earning
import logging

router = APIRouter()
logger = logging.getLogger("app")

# Create Earnings Entry
@router.post("/new", response_model=EarningsOut)
def add_earnings(earnings: Earnings, db: Session = Depends(get_db)):
    return create_earnings(db, earnings)

# Get all earnings for a user
@router.get("/", response_model=list[EarningsOut])
def fetch_earnings(user_id: str, db: Session = Depends(get_db)):
    earnings = get_earnings_by_user(db, user_id)
    if not earnings:
        raise HTTPException(status_code=404, detail="No earnings found for this user")
    return earnings

# Get latest earnings for a user
@router.put("/edit", response_model=EarningsOut)
def edit_earning(earning_id: str, edited_earning: Dict[str, Any], db: Session = Depends(get_db)):
    earning = get_earning(db, earning_id)
    if not earning:
        raise HTTPException(status_code=404, detail="No earnings record found")
    
    update_data = {k: v for k, v in edited_earning.items() if v is not None}
    if not update_data:
        raise HTTPException(status_code=400, detail="No valid fields to update.")

    # Perform the update in the database
    updated_earning = update_earning(db, earning, update_data)

    return updated_earning  # Return the updated user

