from sqlalchemy.orm import Session
from models.harvest import Crop, Harvest
from models.user import User
from schemas.harvest import CropBase, HarvestUpdate, HarvestBase
from datetime import datetime

# Create a new crop
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
    return db_crop

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


# Delete a crop by ID
def delete_harvest(db: Session, harvest_id: int):
    db_harvest = db.query(Harvest).filter(Harvest.id == harvest_id).first()
    if db_harvest:
        db.delete(db_harvest)
        db.commit()
        return True
    return False


# Get a farmer's last harvest
def get_last_harvest(db: Session, farmer_id: str):
    return db.query(Harvest).filter(User.user_id == farmer_id).first()


# Get a crop by ID
def get_crop(db: Session, harvest_id: int):
    return db.query(Crop).filter(Crop.id == harvest_id).first()

# Get all crop
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
