from pydantic import BaseModel, EmailStr

class LoginRequest(BaseModel):
    email: EmailStr
    password: str

class RegisterRequest(BaseModel):
    first_name: str
    last_name: str
    email: EmailStr
    password: str
    role: str
