from sqlalchemy.orm import Session
from models.transaction import Transaction
from schemas.transaction import TransactionBase
import uuid

# Create a new transaction
def create_transaction(db: Session, transaction: TransactionBase):
    db_transaction = Transaction(id=str(uuid.uuid4), **transaction.model_dump())
    db.add(db_transaction)
    db.commit()
    db.refresh(db_transaction)
    return db_transaction

# Get a transaction by ID
def get_single_transaction(db: Session, transaction_id: str):
    return db.query(Transaction).filter(Transaction.id == transaction_id).first()

# Get all transactions for a specific farmer_id
def get_transactions(db: Session, farmer_id: str):
    transactions = db.query(Transaction).filter(Transaction.farmer_id == farmer_id).all()
    return transactions

# Delete a transaction by ID
def delete_transaction(db: Session, transaction_id: str):
    db_transaction = db.query(Transaction).filter(Transaction.id == transaction_id).first()
    if db_transaction:
        db.delete(db_transaction)
        db.commit()
        return True
    return False
