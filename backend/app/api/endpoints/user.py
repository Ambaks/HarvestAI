from fastapi import APIRouter, Depends, HTTPException, Request
from sqlalchemy.orm import Session
from services.auth import verify_access_token
from crud.user import read_user, create_user, update_user, delete_user
from schemas.user import UserOut, UserUpdate, UserCreate, UserBase
from api.dependencies import get_db

router = APIRouter()

@router.post("/users/", response_model=UserOut)
def create_new_user(user: UserCreate, db: Session = Depends(get_db)):
    existing_user = read_user(db, user.email)
    if existing_user:
        raise HTTPException(status_code=400, detail="Username already exists")
    return create_user(db, user)

@router.get("/users/{email}",  response_model=UserOut)
def read_user(email: str, request: Request, db: Session = Depends(get_db)):
    token = request.cookies.get("access_token")
    if not token:
        raise HTTPException(status_code=401, detail="Not authenticated")

    # Validate the token
    username = verify_access_token(token)
    if not username:
        raise HTTPException(status_code=401, detail="Invalid or expired token")

    # Check if the token's subject matches the requested email
    if username != email:
        raise HTTPException(status_code=403, detail="Access forbidden: Cannot fetch data for other users")

    # Retrieve user data
    user = read_user(db, email)
    if not user:
        raise HTTPException(status_code=404, detail="User not found")
    
    return user



@router.put("/users/{email}", response_model=UserUpdate)
def update_existing_user(user: UserBase, user_update: UserUpdate, db: Session = Depends(get_db)):
    db_user = read_user(db, user.email)
    if not db_user:
        raise HTTPException(status_code=404, detail="User not found")
    return update_user(db, db_user, user_update)

@router.delete("/users/{email}")
def delete_existing_user(user: UserBase, db: Session = Depends(get_db)):
    db_user = read_user(db, user.email)
    if not db_user:
        raise HTTPException(status_code=404, detail="User not found")
    delete_user(db, db_user)
    return {"detail": "User deleted successfully"}