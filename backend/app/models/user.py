from sqlalchemy import Column, String, Integer, UUID
from database.base import Base

class User(Base):
    __tablename__ = "users"

    user_id = Column(String, primary_key=True, index=True, unique=True)
    first_name = Column(String, unique=False, index=False, nullable=False)
    last_name = Column(String, unique=False, index=False, nullable=False)
    email = Column(String, unique=True, index=False, nullable=False)
    hashed_password = Column(String, nullable=False)
    phone = Column(String, nullable=True)
    dob = Column(String, nullable=True)
    role = Column(String, unique=False, index=False, nullable=False)