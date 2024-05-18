from fastapi import APIRouter, HTTPException, status
from app.models.todos import Todo
from app.models.levels import Level
from app.models.signIn import SignInRequest
from app.config.database import collection_name, levels, users
from app.schema.schemas import *
from bson import ObjectId

router = APIRouter()

#GET Request Method
@router.get("/")
async def get_todos():
    todos = list_serial(collection_name.find()) #find everything incollection and return
    return todos

#POST Request Method
@router.post("/")
async def post_todo(todo: Todo):
    collection_name.insert_one(dict(todo))
    
#POST Request Levels(Creating Level)
@router.post("/CreateLevel")
async def post_levels(level: Level):
    levels.insert_one(dict(level))
    
#GET Request Method
@router.get("/LoadLevel")
async def get_levels():
    todos = list_level(levels.find()) #find everything incollection and return
    return todos

@router.post("/signin")
async def sign_in(request: SignInRequest):
    # Dummy authentication logic
    user = users.find_one({"username": request.username, "password": request.password})
    if user:
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
    users.insert_one(dict(request))
    return {"message": "User created successfully"}