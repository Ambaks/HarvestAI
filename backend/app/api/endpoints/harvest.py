# Define Harvest endpoints with Bluetooth functionality using Bleak
from fastapi import APIRouter, Depends, HTTPException
from sqlalchemy.orm import Session
from schemas.harvest import HarvestCreate, HarvestRead, HarvestUpdate
from crud.harvest import create_harvest, get_harvest, update_harvest, delete_harvest
from services.bluetooth import discover_bluetooth_devices, connect_to_bluetooth_device, read_weight_from_device
from database.session import SessionLocal
import asyncio

router = APIRouter()

def get_db():
    db = SessionLocal()
    try:
        yield db
    finally:
        db.close()

@router.get("/bluetooth/devices/")
async def list_bluetooth_devices():
    """Discover nearby Bluetooth devices."""
    devices = await discover_bluetooth_devices()
    return {"devices": devices}

@router.post("/bluetooth/", response_model=HarvestRead)
async def add_harvest_from_bluetooth(farmer_id: int, location: str, device_address: str, db: Session = Depends(get_db)):
    """Add harvest data using a Bluetooth-connected scale."""
    client = await connect_to_bluetooth_device(device_address)
    if not client:
        raise HTTPException(status_code=400, detail="Failed to connect to Bluetooth device")

    weight = await read_weight_from_device(client)
    if weight is None:
        await client.disconnect()
        raise HTTPException(status_code=400, detail="Failed to read weight from device")

    await client.disconnect()

    harvest_data = HarvestCreate(farmer_id=farmer_id, weight=weight, location=location)
    return create_harvest(db, harvest_data)

@router.get("/{harvest_id}", response_model=HarvestRead)
def read_harvest(harvest_id: int, db: Session = Depends(get_db)):
    """Retrieve a specific harvest record."""
    harvest = get_harvest(db, harvest_id)
    if not harvest:
        raise HTTPException(status_code=404, detail="Harvest not found")
    return harvest

@router.put("/{harvest_id}", response_model=HarvestRead)
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
