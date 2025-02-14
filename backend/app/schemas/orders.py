from pydantic import BaseModel

class OrderCreate(BaseModel):
    farmer_id: str
    crop_name: str
    price_per_kg: float
    exporter_id: str
    quantity: int
    due_date: str

class OrderUpdate(BaseModel):
    status: str

class OrderOut(OrderCreate):
    id: str
    status: str

    class Config:
        from_attributes=True

    @classmethod
    def from_orm(cls, order):
        """Convert ORM model to Pydantic model while formatting `due_date`."""
        return cls(
            id=order.id,
            crop_name = order.crop_name,
            price_per_kg = order.price_per_kg,
            farmer_id=order.farmer_id,
            exporter_id=order.exporter_id, 
            quantity=order.quantity,
            due_date=order.due_date, 
            status=order.status,
        )