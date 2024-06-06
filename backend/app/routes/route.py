from fastapi import APIRouter, HTTPException, status
from app.models.levels import Level, UserInteraction
from app.models.signIn import SignInRequest
from app.models.signUp import SignUpRequest
from app.config.database import levels, users,create_easy_level
from app.routes.openai_query import *
from app.schema.schemas import *
from bson import ObjectId
import bcrypt

router = APIRouter()

def str_to_bool(s):
    return s.lower() == 'true'

# POST Request to handle user interaction and send back feedback
@router.post("/UserInteraction")
async def user_interaction(response: UserInteraction):
    code = response.code
    user_input = response.user_input
    file_number = response.file_number

    line_no = line_number(user_input) # Gets the line number from user input
    parsed_line = parse_with_line_number(code, file_number, line_no) # Parses code for the line object
    correct = determine_correctness(parsed_line, user_input) # Determines if the user makes a correct suggestion
    correct = str_to_bool(correct)
    coworker = coworker_response(correct) # Gets a coworker's response
    new_code = code_modification(code, file_number, line_no, correct) # Makes the modification to the code
    
    if code.mistakes_found == code.number_of_mistakes:
        return {"response": get_openai_response("You are the coworker of a user who is doing a code review on your code,  the user has found all the mistakes in the code. Congratulate them on their good work"), "code": new_code}

    return {"response": coworker, "code": new_code}

# POST Request to Insert Easy Level
@router.post("/InsertEasyLevel")
async def insert_easy_level():
    easy_level = create_easy_level()
    # Check if the base level already exists
    if not levels.find_one({"repo": "easy_example"}):
        # Insert the base level
        levels.insert_one(easy_level)
        return {"message": "Easy level inserted."}
    else:
        return {"message": "Easy level already exists skipping insertion."}
    
#GET Request Method to load level based on repo name
@router.get("/LoadLevel")
async def get_levels(repo: str):
    levelstest = levels.find_one({"repo": repo})
    return individual_seriallevel(levelstest)

@router.post("/signin")
async def sign_in(request: SignInRequest):
    # Dummy authentication logic
    user = users.find_one({"email": request.email})
    if user and bcrypt.checkpw(request.password.encode('utf-8'), user['password']):
        return {"message": "Signed in successfully!", "user": {"email": user['email'], "preferredName": user['preferredName']}}
    else:
        raise HTTPException(
            status_code=status.HTTP_401_UNAUTHORIZED,
            detail="Sign in failed."
        )

@router.post("/signup")
async def signup(request: SignUpRequest):
    existing_user = users.find_one({"email": request.email})
    if existing_user:
        raise HTTPException(status_code=400, detail="Email is in use")
    hashed_password = bcrypt.hashpw(request.password.encode('utf-8'), bcrypt.gensalt())
    user_data = {
        "email": request.email,
        "password": hashed_password,
        "preferredName": request.preferredName
    }
    users.insert_one(user_data)
    return {"message": "User created successfully"}