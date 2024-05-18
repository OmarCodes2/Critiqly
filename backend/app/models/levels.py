from pydantic import BaseModel

class Level(BaseModel):
    difficulty: str
    code: str
    mistakes: int