from fastapi import APIRouter, HTTPException, status
from app.models.levels import Level, UserInteraction
from app.models.signIn import SignInRequest
from app.config.database import levels, users,create_easy_level
from app.routes.openai_query import *
from app.schema.schemas import *
from bson import ObjectId
import bcrypt

router = APIRouter()

def str_to_bool(s):
    return s.lower() == 'true'

@router.post("/UserInteraction")
async def user_interaction(response: UserInteraction):
    code = response.code
    user_input = response.user_input

    line_no = line_number(user_input)
    line_code = parse_with_line_number(line_no, code)
    correct = determine_correctness(line_code, user_input)
    correct = str_to_bool(correct)
    coworker = coworker_response(correct)
    new_code = code_modification(line_no, code, correct)

    return {"response": coworker, "code": new_code}

# POST Request to Insert Easy Level
@router.post("/InsertEasyLevel")
async def insert_easy_level():
    easy_level = create_easy_level()
    # Check if the base level already exists
    if not levels.find_one({"difficulty": "easy"}):
        # Insert the base level
        levels.insert_one(easy_level)
        return {"message": "Easy level inserted."}
    else:
        return {"message": "Easy level already exists skipping insertion."}
    
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