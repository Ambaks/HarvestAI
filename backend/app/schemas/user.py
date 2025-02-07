import uuid
from pydantic import BaseModel, EmailStr, UUID4


class UserBase(BaseModel):
    first_name: str
    last_name: str
    email: EmailStr

class UserOut(UserBase):
    id: UUID4

    class Config:
        from_attributes = True

class UserCreate(UserBase):
    password: str

class UserUpdate(UserBase):
    first_name: str | None = None
    last_name: str | None = None
    email: EmailStr | None = None
    password: str | None = None

    class Config:
        from_attributes = True

class Token(BaseModel):
    access_token: str
    token_type: str