from sqlalchemy.orm import Session
from models.harvest import Crop, Harvest, ExporterCrop
from models.user import User
from schemas.harvest import CropBase, HarvestUpdate, HarvestBase
from schemas.ExporterCrops import ExporterCropCreate
from datetime import datetime, timezone
import uuid


def create_crop(db: Session, crop: CropBase):
    # Convert string date to datetime object
    harvest_date = datetime.strptime(crop.date, "%Y-%m-%d")
    today = datetime.now()

    # Determine if crop is harvested
    harvested_status = True if harvest_date <= today else False

    # Create the crop record
    db_crop = Crop(**crop.model_dump(), harvested=harvested_status)
    db.add(db_crop)
    db.commit()
    db.refresh(db_crop)
    if harvested_status:
        db_harvest = Harvest(farmer_id=crop.farmer_id, crop_id=str(uuid.uuid4()), crop_name=crop.crop_name, quantity=crop.quantity, quality=crop.quality, harvest_date=crop.date, status="Pending")
        db.add(db_harvest)
        db.commit()
        db.refresh(db_harvest)
    return db_crop


def create_harvest(db: Session, crop_id: str, harvest: HarvestBase):
    # Update the current crop record
    db_crop = db.query(Crop).filter(Crop.id == crop_id).first()
    db_crop.harvested = True
    # Create the harvest record
    db_harvest = Harvest(**harvest.model_dump())
    db.add(db_harvest)
    db.commit()
    db.refresh(db_crop)
    db.refresh(db_harvest)
    return db_harvest


# Modify crop
def update_crop(db: Session, crop_id: str, crop: HarvestUpdate):
    # Get the existing harvest entry by its ID
    db_crop = db.query(Crop).filter(Crop.id == crop_id).first()

    if db_crop:
        # Update the fields with the new data
        for key, value in crop.dict(exclude_unset=True).items():
            setattr(db_crop, key, value)

        db.commit()
        db.refresh(db_crop)
        return db_crop
    print("Crop not found.")

# Modify harvest
def update_harvest(db: Session, harvest_id: str, crop: HarvestUpdate):
    # Get the existing harvest entry by its ID
    db_harvest = db.query(Harvest).filter(Harvest.id == harvest_id).first()

    if db_harvest:
        # Update the fields with the new data
        for key, value in crop.dict(exclude_unset=True).items():
            setattr(db_harvest, key, value)

        db.commit()
        db.refresh(db_harvest)
        return db_harvest
    print("Crop not found.")


# Delete a crop by ID
def delete_harvest(db: Session, harvest_id: int):
    db_harvest = db.query(Harvest).filter(Harvest.id == harvest_id).first()
    if db_harvest:
        db.delete(db_harvest)
        db.commit()
        return True
    return False


# Get a crop by ID
def get_crop(db: Session, harvest_id: int):
    return db.query(Crop).filter(Crop.id == harvest_id).first()

# Get all crops
def get_crops(db: Session):
    return db.query(Crop).all()

# Delete a crop by ID
def delete_crop(db: Session, harvest_id: int):
    db_harvest = db.query(Crop).filter(Crop.id == harvest_id).first()
    if db_harvest:
        db.delete(db_harvest)
        db.commit()
        return True
    return False


'''UPCOMING HARVESTS SECTION'''

import schemas
import uuid
from datetime import datetime

def assign_crop_to_exporter(db: Session, exporter_crop: ExporterCropCreate):
    """Assigns a crop to an exporter."""
    db_exporter_crop = ExporterCrop(
        id=str(uuid.uuid4()),
        exporter_id=exporter_crop.exporter_id,
        crop_id=exporter_crop.crop_id,
        status="Pending",
        assigned_at=datetime.now(timezone.utc),
    )
    db.add(db_exporter_crop)
    db.commit()
    db.refresh(db_exporter_crop)
    return db_exporter_crop

def get_exporter_crops(db: Session, exporter_id: str):
    """Gets all crops assigned to a specific exporter and fetches the latest crop details."""
    exporter_crops = db.query(ExporterCrop).filter(ExporterCrop.exporter_id == exporter_id).all()
    
    final_exporter_crops = []
    
    for item in exporter_crops:
        crop = db.query(Crop).filter(Crop.id == item.crop_id).first()  # Fetch latest crop details
        if crop:
            final_exporter_crops.append({
                "supplier": crop.farmer_id,
                "crop": crop.crop_name,
                "yield": crop.quantity,
                "availability": crop.date,
                "crop_id": crop.id,
            })
    
    return final_exporter_crops

def update_exporter_crop_status(db: Session, exporter_crop_id: str, status: str):
    """Updates the status of an assigned crop (e.g., Pending → Completed)."""
    db_exporter_crop = db.query(ExporterCrop).filter(ExporterCrop.id == exporter_crop_id).first()
    if db_exporter_crop:
        db_exporter_crop.status = status
        db.commit()
        db.refresh(db_exporter_crop)
    return db_exporter_crop

def delete_exporter_crop(db: Session, exporter_crop_id: str):
    """Removes an assignment (if canceled or invalid)."""
    db_exporter_crop = db.query(ExporterCrop).filter(ExporterCrop.id == exporter_crop_id).first()
    if db_exporter_crop:
        db.delete(db_exporter_crop)
        db.commit()
    return db_exporter_crop