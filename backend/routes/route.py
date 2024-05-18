from fastapi import APIRouter, HTTPException, status
from models.todos import Todo
from models.levels import Level
from models.signIn import SignInRequest
from config.database import collection_name, levels
from schema.schemas import *
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
    if request.username == "user" and request.password == "pass":
        return {"message": "Signed in successfully!"}
    else:
        raise HTTPException(
            status_code=status.HTTP_401_UNAUTHORIZED,
            detail="Sign in failed."
        )