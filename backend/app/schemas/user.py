import uuid
from pydantic import BaseModel, EmailStr


class UserBase(BaseModel):
    first_name: str
    last_name: str
    email: EmailStr
    role: str

class UserOut(UserBase):
    id: str
    phone: str | None = None
    dob: str    | None = None
    gender: str | None = None
    farm_size: float | None = None
    location: str | None = None

    class Config:
        from_attributes = True

class UserCreate(UserBase):
    password: str

class UserUpdate(BaseModel):
    first_name: str| None = None
    last_name: str| None = None
    email: EmailStr| None = None
    dob: str | None = None
    password: str | None = None
    phone: str | None = None
    gender: str | None = None
    farm_size: float | None = None
    location: str | None = None
    

    class Config:
        from_attributes = True

class Token(BaseModel):
    access_token: str
    token_type: str


