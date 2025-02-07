from sqlalchemy.orm import Session
from models.farmer import Farmer
from schemas.farmer import FarmerCreate

# Create a new farmer
def create_farmer(db: Session, farmer: FarmerCreate):
    db_farmer = Farmer(**farmer.model_dump())
    db.add(db_farmer)
    db.commit()
    db.refresh(db_farmer)
    return db_farmer

# Get a farmer by ID
def get_farmer(db: Session, farmer_id: int):
    return db.query(Farmer).filter(Farmer.id == farmer_id).first()

# Get all farmers
def get_farmers(db: Session):
    return db.query(Farmer).all()

# Update a farmer by ID
def update_farmer(db: Session, farmer_id: int, farmer: FarmerCreate):
    db_farmer = db.query(Farmer).filter(Farmer.id == farmer_id).first()
    if db_farmer:
        db_farmer.name = farmer.name
        db_farmer.location = farmer.location
        db.commit()
        db.refresh(db_farmer)
        return db_farmer
    return None

# Delete a farmer by ID
def delete_farmer(db: Session, farmer_id: int):
    db_farmer = db.query(Farmer).filter(Farmer.id == farmer_id).first()
    if db_farmer:
        db.delete(db_farmer)
        db.commit()
        return True
    return False
