from fastapi import APIRouter
from models.todos import Todo
from models.levels import Level
from config.database import collection_name, collection_name1
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
    collection_name1.insert_one(dict(level))
    
#GET Request Method
@router.get("/LoadLevel")
async def get_levels():
    todos = list_level(collection_name1.find()) #find everything incollection and return
    return todos