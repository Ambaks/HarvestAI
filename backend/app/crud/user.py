from pydantic import EmailStr, UUID4
from sqlalchemy.orm import Session
from schemas.auth import RegisterRequest
from models.user import User
from schemas.user import UserUpdate
from services.auth import get_password_hash
import uuid

def read_user_by_id(db: Session, user_id: UUID4):
    return db.query(User).filter(User.user_id == user_id).first()

def read_user(db: Session, email: EmailStr):
    return db.query(User).filter(User.email == email).first()

def create_user(db: Session, user: RegisterRequest):
    hashed_password = get_password_hash(user.password)
    db_user = User(user_id=str(uuid.uuid4()), first_name=user.first_name, last_name=user.last_name, email=user.email, role=user.role, hashed_password=hashed_password)
    db.add(db_user)
    db.commit()
    db.refresh(db_user)
    return db_user

def update_user(db: Session, db_user: User, update_data: dict):
    for key, value in update_data.items():
        setattr(db_user, key, value)  # Dynamically update fields

    db.commit()
    db.refresh(db_user)  # Refresh to get updated data from DB
    return db_user

def delete_user(db: Session, db_user: User):
    db.delete(db_user)
    db.commit()