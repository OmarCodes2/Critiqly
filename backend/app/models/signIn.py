from pydantic import BaseModel

class SignInRequest(BaseModel):
    username: str
    password: str