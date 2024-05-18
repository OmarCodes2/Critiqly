import os
from dotenv import load_dotenv
from pymongo import MongoClient

from app.models.levels import *

# Loading environment variables from .env file
load_dotenv()

# Connecting to Database
mongoURL = os.getenv('mongoURL')
client = MongoClient(mongoURL)

db = client.todo_db

levels=db["levels"]
users=db["users"]
        
#Function for inserting easy level
def create_easy_level():
    easy_level = Level(
        difficulty="easy",
        number_of_mistakes = 2,
        mistakes_found = 0,
        lines=[
            CodeLine(
                line_number=1,
                is_modified = False,
                versions=[
                    CodeVersion(id=1, code="def example_function():"),
                ]
            ),
            CodeLine(
                line_number=2,
                is_modified = False,
                versions=[
                    CodeVersion(id=1, code="    print('Starting function')"),
                ]
            ),
            CodeLine(
                line_number=3,
                is_modified = False,
                versions=[
                    CodeVersion(id=1, code="    x = 10"),
                ]
            ),
            CodeLine(
                line_number=4,
                is_modified = False,
                versions=[
                    CodeVersion(id=1, code="    y = 20"),
                ]
            ),
            CodeLine(
                line_number=5,
                is_modified = True,
                is_correct = False,
                versions=[
                    CodeVersion(id=1, code="    sum_value = f + y"),
                    CodeVersion(id=2, code="    sum_value = f x y"),
                    CodeVersion(id=3, code="    sum_value = f * y"),
                ]
            ),
            CodeLine(
                line_number=6,
                is_modified = False,
                is_correct = True,
                versions=[
                    CodeVersion(id=1, code="    print(f'The sum of x and y is: {sum_value}')"),
                    CodeVersion(id=2, code="    print(f'The product of x and y is: {sum_value}')"),  # Corrected
                ]
            ),
            CodeLine(
                line_number=7,
                is_modified = True,
                is_correct = False,
                versions=[
                    CodeVersion(id=1, code="    if product_value > 20:"),
                    CodeVersion(id=2, code="    if product_value > 20"),  
                    CodeVersion(id=3, code="    if product_value > 20:"),  
                ]
            ),
            CodeLine(
                line_number=8,
                is_modified = False,
                versions=[
                    CodeVersion(id=1, code="        print('Sum is greater than 20')"),
                ]
            ),
            CodeLine(
                line_number=9,
                is_modified = False,
                versions=[
                    CodeVersion(id=1, code="    else:"),
                ]
            ),
            CodeLine(
                line_number=10,
                is_modified = False,
                versions=[
                    CodeVersion(id=1, code="        print('Sum is not greater than 20')"),
                ]
            ),
            CodeLine(
                line_number=11,
                is_modified = False,
                versions=[
                    CodeVersion(id=1, code="    return sum_value"),
                ]
            ),
        ],
        readme="This is an easy level with a function that calculates the sum of two numbers. The person has changed the function to multiplication of two numbers instead. There are two mistakes with the new additions that need to be fixed."
    )
    return easy_level.dict()
    
def ensure_easy_level_exists():
    easy_level = create_easy_level()
    # Check if the base level already exists
    if not levels.find_one({"difficulty": "easy"}):
        # Insert the base level
        levels.insert_one(easy_level)
        print("Easy level inserted.")
    else:
        print("Easy level already exists.")
