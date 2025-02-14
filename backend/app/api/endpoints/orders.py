from models.transaction import Transaction
from fastapi import APIRouter, Depends, HTTPException
from sqlalchemy.orm import Session
from api.dependencies import get_db
from models.orders import Order
from schemas.orders import OrderCreate, OrderUpdate, OrderOut
from uuid import uuid4
from datetime import datetime

router = APIRouter()

@router.post("/orders", response_model=OrderOut)
def create_order(order_data: OrderCreate, db: Session = Depends(get_db)):
    """
    Exporters create an order for a farmer.
    """
    order = Order(**order_data.dict(), status="Pending")
    db.add(order)
    db.commit()
    db.refresh(order)
    return order

@router.get("/orders", response_model=list[OrderOut])
def get_orders(user_id: str, db: Session = Depends(get_db)):
    """
    Retrieve orders for a specific farmer.
    """
    query = db.query(Order).filter(Order.farmer_id == user_id, Order.status == "Pending").all()
    return [OrderOut.from_orm(order) for order in query]  

@router.patch("/orders", response_model=OrderOut)
def update_order(order_id: str, order_update: OrderUpdate, db: Session = Depends(get_db)):
    """
    Farmers accept or decline an order by updating its status.
    If the order is accepted, a new transaction is created.
    """
    order = db.query(Order).filter(Order.id == order_id).first()
    if not order:
        raise HTTPException(status_code=404, detail="Order not found")

    # Update order status
    if order_update.status in ["Accepted", "Declined"]:
        order.status = order_update.status  # Set status to either Accepted or Rejected

    # If the order is accepted, create a new transaction with "Pending" status
    if order.status == "Accepted":
        new_transaction = Transaction(
            id=str(uuid4()),
            harvest_id="None",  # Update if linked to a specific harvest
            farmer_id=order.farmer_id,
            exporter_id=order.exporter_id,
            quantity=order.quantity,
            crop_name=order.crop_name,  # Ensure correct crop name
            quality="Yes",  # Update later if needed
            price_per_kg=order.price_per_kg,
            date=str(order.due_date),
            status="Pending",
            dollar_amount=order.quantity * order.price_per_kg  # Calculate the amount
        )
        db.add(new_transaction)
        pass
    db.commit()
    db.refresh(order)
    return order