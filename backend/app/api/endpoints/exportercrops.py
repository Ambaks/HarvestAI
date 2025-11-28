from fastapi import APIRouter, Depends, HTTPException, Path
from sqlalchemy.orm import Session
from schemas.ExporterCrops import ExporterCropResponse, ExporterCropCreate, ExporterCropUpdate
from crud.harvest import assign_crop_to_exporter, get_exporter_crops, update_exporter_crop_status, delete_exporter_crop
from api.dependencies import get_db

router = APIRouter()

@router.post("/exporter-crops/", response_model=ExporterCropResponse)
def assign_crop(exporter_crop: ExporterCropCreate, db: Session = Depends(get_db)):
    """Assigns a crop to an exporter."""
    return assign_crop_to_exporter(db, exporter_crop)

@router.get("/exporter-crops/{exporter_id}", response_model=list[ExporterCropResponse])
def get_crops_for_exporter(
    exporter_id: str = Path(..., description="Exporter ID", min_length=1, max_length=100),
    db: Session = Depends(get_db)
):
    """Fetches all crops assigned to a specific exporter."""
    return get_exporter_crops(db, exporter_id)

@router.put("/exporter-crops/{exporter_crop_id}", response_model=ExporterCropResponse)
def update_crop_status(
    exporter_crop_id: str = Path(..., description="Exporter Crop Assignment ID", min_length=1, max_length=100),
    update_data: ExporterCropUpdate = None,
    db: Session = Depends(get_db)
):
    """Updates the status of an assigned crop."""
    updated_crop = update_exporter_crop_status(db, exporter_crop_id, update_data.status)
    if not updated_crop:
        raise HTTPException(status_code=404, detail="Assignment not found")
    return updated_crop

@router.delete("/exporter-crops/{exporter_crop_id}")
def delete_crop_assignment(
    exporter_crop_id: str = Path(..., description="Exporter Crop Assignment ID", min_length=1, max_length=100),
    db: Session = Depends(get_db)
):
    """Deletes an assigned crop."""
    deleted_crop = delete_exporter_crop(db, exporter_crop_id)
    if not deleted_crop:
        raise HTTPException(status_code=404, detail="Assignment not found")
    return {"message": "Assignment deleted successfully"}