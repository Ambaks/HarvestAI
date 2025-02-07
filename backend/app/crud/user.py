from pydantic import EmailStr
from sqlalchemy.orm import Session
from schemas.auth import RegisterRequest
from models.user import User
from schemas.user import UserUpdate
from services.auth import get_password_hash
import uuid

def read_user(db: Session, email: EmailStr):
    return db.query(User).filter(User.email == email).first()

def create_user(db: Session, user: RegisterRequest):
    hashed_password = get_password_hash(user.password)
    db_user = User(id=uuid.uuid4(), first_name=user.first_name, last_name=user.last_name, email=user.email, hashed_password=hashed_password)
    db.add(db_user)
    db.commit()
    db.refresh(db_user)
    return db_user

def update_user(db: Session, db_user: User, user_update: UserUpdate):
    if user_update.first_name:
        db_user.first_name = user_update.first_name
    if user_update.last_name:
        db_user.last_name = user_update.last_name
    if user_update.email:
        db_user.email = user_update.email
    if user_update.password:
        db_user.hashed_password = get_password_hash(user_update.password)
    db.commit()
    db.refresh(db_user)
    return db_user

def delete_user(db: Session, db_user: User):
    db.delete(db_user)
    db.commit()