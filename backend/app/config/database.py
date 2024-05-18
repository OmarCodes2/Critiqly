import os
from dotenv import load_dotenv
from pymongo import MongoClient

# Loading environment variables from .env file
load_dotenv()

# Connecting to Database
mongoURL = os.getenv('mongoURL')
client = MongoClient(mongoURL)

db = client.todo_db

collection_name =db["todo_collection"]
levels=db["levels"]
users=db["users"]