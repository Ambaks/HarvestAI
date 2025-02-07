from fastapi import APIRouter, Depends, HTTPException
from sqlalchemy.orm import Session
from schemas.exporter import ExporterCreate, ExporterRead
from crud.exporter import create_exporter, get_exporter, get_exporters, delete_exporter
from database.session import SessionLocal

router = APIRouter()

def get_db():
    db = SessionLocal()
    try:
        yield db
    finally:
        db.close()

@router.post("/", response_model=ExporterRead)
def add_exporter(exporter: ExporterCreate, db: Session = Depends(get_db)):
    return create_exporter(db, exporter)

@router.get("/{exporter_id}", response_model=ExporterRead)
def read_exporter(exporter_id: int, db: Session = Depends(get_db)):
    db_exporter = get_exporter(db, exporter_id)
    if db_exporter is None:
        raise HTTPException(status_code=404, detail="Exporter not found")
    return db_exporter

@router.get("/", response_model=list[ExporterRead])
def read_exporters(db: Session = Depends(get_db)):
    return get_exporters(db)

@router.delete("/{exporter_id}")
def delete_exporter_endpoint(exporter_id: int, db: Session = Depends(get_db)):
    success = delete_exporter(db, exporter_id)
    if not success:
        raise HTTPException(status_code=404, detail="Exporter not found")
    return {"message": "Exporter deleted successfully"}
