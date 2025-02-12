# Define Harvest endpoints with Bluetooth functionality using Bleak
from typing import List
from models.harvest import Crop
from fastapi import APIRouter, Depends, HTTPException
from sqlalchemy.orm import Session
from schemas.harvest import HarvestCreate, HarvestBase, HarvestUpdate
from crud.harvest import create_harvest, get_harvest, update_harvest, delete_harvest
from services.bluetooth import discover_bluetooth_devices, connect_to_bluetooth_device, read_weight_from_device
from database.session import SessionLocal
from datetime import date

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

@router.get("/crops/{harvest_id}", response_model=HarvestBase)
def read_harvest(harvest_id: int, db: Session = Depends(get_db)):
    """Retrieve a specific harvest record."""
    harvest = get_harvest(db, harvest_id)
    if not harvest:
        raise HTTPException(status_code=404, detail="Harvest not found")
    return harvest

@router.get("/crops/", response_model=List[HarvestBase])
def read_all_harvests(farmer_id: str, db: Session = Depends(get_db)):
    """Retrieve all harvest records for a specific farmer."""
    harvests = db.query(Crop).filter(Crop.farmer_id == farmer_id).all()
    if not harvests:
        raise HTTPException(status_code=404, detail="No harvests found for this farmer")
    return harvests

@router.put("/{harvest_id}", response_model=HarvestBase)
def update_harvest_record(harvest_id: int, harvest_update: HarvestUpdate, db: Session = Depends(get_db)):
    """Update a specific harvest record."""
    updated_harvest = update_harvest(db, harvest_id, harvest_update)
    if not updated_harvest:
        raise HTTPException(status_code=404, detail="Harvest not found")
    return updated_harvest

@router.delete("/{harvest_id}", response_model=dict)
def delete_harvest_record(harvest_id: int, db: Session = Depends(get_db)):
    """Delete a specific harvest record."""
    success = delete_harvest(db, harvest_id)
    if not success:
        raise HTTPException(status_code=404, detail="Harvest not found")
    return {"message": "Harvest deleted successfully"}
