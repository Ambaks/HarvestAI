from sqlalchemy.orm import Session
from models.transaction import Transaction
from schemas.transaction import TransactionCreate

# Create a new transaction
def create_transaction(db: Session, transaction: TransactionCreate):
    db_transaction = Transaction(**transaction.model_dump())
    db.add(db_transaction)
    db.commit()
    db.refresh(db_transaction)
    return db_transaction

# Get a transaction by ID
def get_transaction(db: Session, transaction_id: int):
    return db.query(Transaction).filter(Transaction.id == transaction_id).first()

# Get all transactions
def get_transactions(db: Session):
    return db.query(Transaction).all()

# Delete a transaction by ID
def delete_transaction(db: Session, transaction_id: int):
    db_transaction = db.query(Transaction).filter(Transaction.id == transaction_id).first()
    if db_transaction:
        db.delete(db_transaction)
        db.commit()
        return True
    return False
