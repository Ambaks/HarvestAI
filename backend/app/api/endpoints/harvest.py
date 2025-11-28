# Define Harvest endpoints with Bluetooth functionality using Bleak
from typing import List
from uuid import UUID
from models.harvest import Crop, Harvest
from fastapi import APIRouter, Depends, HTTPException, Query
from sqlalchemy.orm import Session
from schemas.harvest import CropBase, HarvestUpdate, CropRead ,HarvestOut, HarvestBase
from crud.harvest import create_crop, update_crop, delete_crop, create_harvest, delete_harvest, update_harvest
from api.dependencies import get_db

router = APIRouter()


@router.post("/crops/new", response_model=CropBase)
async def add_crop(crop: CropBase, db: Session = Depends(get_db)):
    return create_crop(db, crop)


@router.post("/new", response_model=HarvestOut)
async def add_harvest(harvest: HarvestBase, db: Session = Depends(get_db)):
    return create_harvest(db, harvest.crop_id, harvest)


# Get unharvested crops
@router.get("/crops", response_model=List[CropRead])
def read_all_crops(
    farmer_id: str = Query(..., description="Farmer ID", min_length=1, max_length=100),
    db: Session = Depends(get_db)
):
    """Retrieve all unharvested crops for a specific farmer."""
    harvests = db.query(Crop).filter(Crop.farmer_id == farmer_id, Crop.harvested == False).all()
    if not harvests:
        raise HTTPException(status_code=404, detail="No unharvested crops found for this farmer")
    return harvests

# Get harvested crops
@router.get("/", response_model=List[HarvestOut])
def read_all_harvests(
    farmer_id: str = Query(..., description="Farmer ID", min_length=1, max_length=100),
    db: Session = Depends(get_db)
):
    """Retrieve all harvested crops for a specific farmer."""
    harvests = db.query(Harvest).filter(Harvest.farmer_id == farmer_id).all()
    if not harvests:
        raise HTTPException(status_code=404, detail="No harvested crops found for this farmer")
    return harvests

@router.delete("/", response_model=dict)
def delete_harvest_record(
    harvest_id: str = Query(..., description="Harvest ID", min_length=1, max_length=100),
    db: Session = Depends(get_db)
):
    """Delete a specific harvest record."""
    success = delete_harvest(db, harvest_id)
    if not success:
        raise HTTPException(status_code=404, detail="Harvest not found")
    return {"message": "Harvest deleted successfully"}


@router.delete("/crops", response_model=dict)
def delete_crop_record(
    harvest_id: str = Query(..., description="Crop ID", min_length=1, max_length=100),
    db: Session = Depends(get_db)
):
    """Delete a specific crop record."""
    success = delete_crop(db, harvest_id)
    if not success:
        raise HTTPException(status_code=404, detail="Crop not found")
    return {"message": "Crop deleted successfully"}


@router.put("/crops", response_model=CropRead)
def update_crop_record(
    crop_id: str = Query(..., description="Crop ID", min_length=1, max_length=100),
    harvest_update: HarvestUpdate = None,
    db: Session = Depends(get_db)
):
    """Update a specific crop record."""
    updated_harvest = update_crop(db, crop_id, harvest_update)
    if not updated_harvest:
        raise HTTPException(status_code=404, detail="Crop not found")
    return updated_harvest

@router.put("/", response_model=HarvestUpdate)
def update_harvest_record(
    harvest_id: str = Query(..., description="Harvest ID", min_length=1, max_length=100),
    harvest_update: HarvestUpdate = None,
    db: Session = Depends(get_db)
):
    """Update a specific harvest record."""
    updated_harvest = update_harvest(db, harvest_id, harvest_update)
    if not updated_harvest:
        raise HTTPException(status_code=404, detail="Harvest not found")
    return updated_harvest


