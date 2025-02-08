from datetime import timedelta
from fastapi import APIRouter, Depends, HTTPException, Response
from sqlalchemy.orm import Session
from fastapi.security import OAuth2PasswordRequestForm
from services.auth import verify_password, create_access_token, verify_access_token
from crud.user import read_user, create_user
from schemas.user import Token
from api.dependencies import get_db
from schemas.auth import LoginRequest, RegisterRequest
from models.user import User
from schemas.user import UserBase

router = APIRouter()

@router.post("/auth/register", response_model=Token)
def register(user: RegisterRequest, db: Session = Depends(get_db)):
    existing_user = read_user(db, user.email)
    if existing_user:
        raise HTTPException(status_code=400, detail="Username already exists")
    create_user(db, user)
    access_token = create_access_token(data={"sub": user.email})
    return {"access_token": access_token, "token_type": "bearer"}

"""
@router.post("/auth/login", response_model=Token)
def login(form_data: OAuth2PasswordRequestForm = Depends(), db: Session = Depends(get_db)):
    user = get_user_by_username(db, form_data.username)
    if not user or not verify_password(form_data.password, user.hashed_password):
        raise HTTPException(status_code=400, detail="Invalid credentials")
    access_token = create_access_token(data={"sub": user.username})
    return {"access_token": access_token, "token_type": "bearer"}
"""


@router.post("/auth/login")
def login(request: LoginRequest, response: Response, db: Session = Depends(get_db)):
    # Fetch user by email
    user = db.query(User).filter(User.email == request.email).first()
    if not user or not verify_password(request.password, user.hashed_password):
        raise HTTPException(status_code=401, detail="Invalid credentials")

    # Generate JWT token
    access_token = create_access_token(data={"sub": user.email})

    # Set the HttpOnly cookie
    response.set_cookie(
        key="access_token",
        value=access_token,
        httponly=True,
        secure=False,  # Set to True for production (HTTPS)
        samesite="Lax"
    )

    return {
        "message": "Login successful",
        "user_info": {
            "id": user.id,
            "first_name": user.first_name,
            "last_name": user.last_name,
            "email": user.email,
            "role": user.role
        }
    }


@router.get("/auth/validate", response_model=UserBase)
def get_current_user(
    token_data: dict = Depends(verify_access_token),  # Return claims from the token
    db: Session = Depends(get_db)
):
    # Extract email from the token claims
    email = token_data.get("sub")
    if not email:
        raise HTTPException(status_code=401, detail="Invalid token: missing subject")

    # Query the database for the user record
    user_record = db.query(User).filter(User.email == email).first()
    if not user_record:
        raise HTTPException(status_code=401, detail="User not found")

    # Return user data as a Pydantic model
    return UserBase(
        id=user_record.id,
        first_name=user_record.first_name,
        last_name=user_record.last_name,
        email=user_record.email,
        role=user_record.role
    )

@router.post("/auth/logout")
def logout(response: Response):
    response.delete_cookie("access_token")
    return {"message": "Logged out successfully"}


