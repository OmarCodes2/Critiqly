from fastapi import APIRouter, HTTPException, status
from app.models.levels import Level
from app.models.signIn import SignInRequest
from app.config.database import levels, users, create_base_level
from app.schema.schemas import *
from bson import ObjectId
import bcrypt

router = APIRouter()


# POST Request to Insert Base Level
@router.post("/InsertBaseLevel")
async def insert_base_level():
    base_level = create_base_level()
    # Check if the base level already exists
    if not levels.find_one({"difficulty": "base"}):
        # Insert the base level
        levels.insert_one(base_level)
        return {"message": "Base level inserted."}
    else:
        return {"message": "Base level already exists skipping insertion."}
    
#GET Request Method
@router.get("/LoadLevel")
async def get_levels(difficulty: str):
    levelstest = list_seriallevels(levels.find({"difficulty": difficulty})) #find everything incollection and return
    return levelstest

@router.post("/signin")
async def sign_in(request: SignInRequest):
    # Dummy authentication logic
    user = users.find_one({"username": request.username})
    if user and bcrypt.checkpw(request.password.encode('utf-8'), user['password']):
        return {"message": "Signed in successfully!"}
    else:
        raise HTTPException(
            status_code=status.HTTP_401_UNAUTHORIZED,
            detail="Sign in failed."
        )

@router.post("/signup")
async def signup(request: SignInRequest):
    request.password = request.password # Ideally, you should hash the password
    existing_user = users.find_one({"username": request.username})
    if existing_user:
        raise ValueError("username already exists")
    hashed_password = bcrypt.hashpw(request.password.encode('utf-8'), bcrypt.gensalt())
    user_data = {
        "username": request.username,
        "password": hashed_password
    }
    users.insert_one(user_data)
    return {"message": "User created successfully"}