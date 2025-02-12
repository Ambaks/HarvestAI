from fastapi import APIRouter, Depends, HTTPException
from sqlalchemy.orm import Session
from schemas.transaction import TransactionBase, TransactionRead
from crud.transaction import create_transaction, get_transactions, delete_transaction, get_single_transaction
from database.session import SessionLocal

router = APIRouter()

def get_db():
    db = SessionLocal()
    try:
        yield db
    finally:
        db.close()

@router.post("/new", response_model=TransactionRead)
def add_transaction(transaction: TransactionBase, db: Session = Depends(get_db)):
    return create_transaction(db, transaction)

@router.get("/{transaction_id}", response_model=TransactionRead)
def read_single_transaction(transaction_id: str, db: Session = Depends(get_db)):
    db_transaction = get_single_transaction(db, transaction_id)
    if db_transaction is None:
        raise HTTPException(status_code=404, detail="Transaction not found")
    return db_transaction

@router.get("/", response_model=list[TransactionRead])
def read_transactions(farmer_id: str, db: Session = Depends(get_db)):
    return get_transactions(db, farmer_id)

@router.delete("/{transaction_id}")
def delete_transaction_endpoint(transaction_id: int, db: Session = Depends(get_db)):
    success = delete_transaction(db, transaction_id)
    if not success:
        raise HTTPException(status_code=404, detail="Transaction not found")
    return {"message": "Transaction deleted successfully"}
