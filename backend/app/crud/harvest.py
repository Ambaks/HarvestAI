from sqlalchemy.orm import Session
from models.harvest import Crop
from schemas.harvest import HarvestBase

# Create a new harvest
def create_harvest(db: Session, harvest: HarvestBase):
    db_harvest = Crop(**harvest.model_dump())
    db.add(db_harvest)
    db.commit()
    db.refresh(db_harvest)
    return db_harvest


# Modify Harvest
def update_harvest(db: Session, harvest_id: int, harvest: Crop):
    # Get the existing harvest entry by its ID
    db_harvest = db.query(Crop).filter(Crop.id == harvest_id).first()

    if db_harvest:
        # Update the fields with the new data
        for key, value in harvest.dict(exclude_unset=True).items():
            setattr(db_harvest, key, value)

        db.commit()
        db.refresh(db_harvest)
        return db_harvest
    return None

# Get a harvest by ID
def get_harvest(db: Session, harvest_id: int):
    return db.query(Crop).filter(Crop.id == harvest_id).first()

# Get all harvests
def get_harvests(db: Session):
    return db.query(Crop).all()

# Delete a harvest by ID
def delete_harvest(db: Session, harvest_id: int):
    db_harvest = db.query(Crop).filter(Crop.id == harvest_id).first()
    if db_harvest:
        db.delete(db_harvest)
        db.commit()
        return True
    return False
