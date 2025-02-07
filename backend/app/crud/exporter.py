from sqlalchemy.orm import Session
from models.exporter import Exporter
from schemas.exporter import ExporterCreate

# Create a new exporter
def create_exporter(db: Session, exporter: ExporterCreate):
    db_exporter = Exporter(**exporter.model_dump())
    db.add(db_exporter)
    db.commit()
    db.refresh(db_exporter)
    return db_exporter

# Get an exporter by ID
def get_exporter(db: Session, exporter_id: int):
    return db.query(Exporter).filter(Exporter.id == exporter_id).first()

# Get all exporters
def get_exporters(db: Session):
    return db.query(Exporter).all()

# Delete an exporter by ID
def delete_exporter(db: Session, exporter_id: int):
    db_exporter = db.query(Exporter).filter(Exporter.id == exporter_id).first()
    if db_exporter:
        db.delete(db_exporter)
        db.commit()
        return True
    return False
