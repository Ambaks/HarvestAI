from fastapi import APIRouter, Depends, HTTPException
from sqlalchemy.orm import Session
from schemas.farmer import FarmerCreate, FarmerRead
from crud.farmer import create_farmer, get_farmer, get_farmers, update_farmer, delete_farmer
from database.session import SessionLocal

router = APIRouter()

def get_db():
    db = SessionLocal()
    try:
        yield db
    finally:
        db.close()

@router.post("/", response_model=FarmerRead)
def add_farmer(farmer: FarmerCreate, db: Session = Depends(get_db)):
    return create_farmer(db, farmer)

@router.get("/{farmer_id}", response_model=FarmerRead)
def read_farmer(farmer_id: int, db: Session = Depends(get_db)):
    db_farmer = get_farmer(db, farmer_id)
    if db_farmer is None:
        raise HTTPException(status_code=404, detail="Farmer not found")
    return db_farmer

@router.get("/", response_model=list[FarmerRead])
def read_farmers(db: Session = Depends(get_db)):
    return get_farmers(db)

@router.put("/{farmer_id}", response_model=FarmerRead)
def update_farmer_endpoint(farmer_id: int, farmer: FarmerCreate, db: Session = Depends(get_db)):
    db_farmer = update_farmer(db, farmer_id, farmer)
    if db_farmer is None:
        raise HTTPException(status_code=404, detail="Farmer not found")
    return db_farmer

@router.delete("/farmers/{farmer_id}")
def delete_farmer_endpoint(farmer_id: int, db: Session = Depends(get_db)):
    success = delete_farmer(db, farmer_id)
    if not success:
        raise HTTPException(status_code=404, detail="Farmer not found")
    return {"message": "Farmer deleted successfully"}
