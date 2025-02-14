# Define Harvest endpoints with Bluetooth functionality using Bleak
from typing import List
from uuid import UUID
from models.harvest import Crop
from fastapi import APIRouter, Depends, HTTPException
from sqlalchemy.orm import Session
from schemas.harvest import HarvestBase, HarvestUpdate, HarvestRead
from crud.harvest import create_harvest, get_harvest, update_harvest, delete_harvest
from database.session import SessionLocal

router = APIRouter()

def get_db():
    db = SessionLocal()
    try:
        yield db
    finally:
        db.close()


@router.post("/crops/new", response_model=HarvestBase)
async def add_harvest(harvest: HarvestBase, db: Session = Depends(get_db),):
    return create_harvest(db, harvest)

@router.get("/crops/{harvest_id}", response_model=HarvestRead)
def read_harvest(harvest_id: UUID, db: Session = Depends(get_db)):
    """Retrieve a specific harvest record."""
    harvest = get_harvest(db, harvest_id)
    if not harvest:
        raise HTTPException(status_code=404, detail="Harvest not found")
    return harvest

@router.get("/crops/", response_model=List[HarvestRead])
def read_all_harvests(farmer_id: str, db: Session = Depends(get_db)):
    """Retrieve all harvest records for a specific farmer."""
    harvests = db.query(Crop).filter(Crop.farmer_id == farmer_id).all()
    if not harvests:
        raise HTTPException(status_code=404, detail="No harvests found for this farmer")
    return harvests

@router.put("/crops/{harvest_id}", response_model=HarvestRead)
def update_harvest_record(harvest_id: UUID, harvest_update: HarvestUpdate, db: Session = Depends(get_db)):
    """Update a specific harvest record."""
    updated_harvest = update_harvest(db, harvest_id, harvest_update)
    if not updated_harvest:
        raise HTTPException(status_code=404, detail="Harvest not found")
    return updated_harvest

@router.delete("/crops/{harvest_id}", response_model=dict)
def delete_harvest_record(harvest_id: UUID, db: Session = Depends(get_db)):
    """Delete a specific harvest record."""
    success = delete_harvest(db, harvest_id)
    if not success:
        raise HTTPException(status_code=404, detail="Harvest not found")
    return {"message": "Harvest deleted successfully"}
