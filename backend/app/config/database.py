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

collection_name =db["todo_collection"]
levels=db["levels"]

#Inserting the Base Levels
def create_base_level():
    base_level = Level(
        difficulty="base",
        lines=[
            CodeLine(
                line_number=1,
                is_modified = True, # Do you need to display versions at all  
                is_correct = False, # If False Display 1,2 if True Display 1,3
                versions=[
                    CodeVersion(id=1, code="print('Old version of line 1')"),
                    CodeVersion(id=2, code="print('New version of line 1')"),
                    CodeVersion(id=3, code="print('Correct version of line 1')")
                ]
            ),
            CodeLine(
                line_number=2,
                is_modified = True,  
                is_correct = False,
                versions=[
                    CodeVersion(id=1, code="x = 10  # Old version"),
                    CodeVersion(id=2, code="x == 10  # New version"),
                    CodeVersion(id=3, code="x = 10  # Correct version")
                ]
            ),
            CodeLine(
                line_number=3,
                is_modified = True,  
                is_correct = False,
                versions=[
                    CodeVersion(id=1, code="y => 20  # Old version"),
                    CodeVersion(id=2, code="y = 20  # New version"),
                    CodeVersion(id=3, code="y = 20  # Correct version")
                ]
            )
        ],
        readme = "hi this is the readme"
    )
    return base_level.dict()

def ensure_base_level_exists():
    base_level = create_base_level()
    # Check if the base level already exists
    if not levels.find_one({"difficulty": "base"}):
        # Insert the base level
        levels.insert_one(base_level)
        print("Base level inserted.")
    else:
        print("Base level already exists.")