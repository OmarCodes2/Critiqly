from pydantic import BaseModel
from typing import List, Optional

class CodeVersion(BaseModel):
    id: int  
    code: str  # The code content

class CodeLine(BaseModel):
    line_number: int  # The original line number
    is_modified: bool # Do you need to display version  
    is_correct: Optional[bool] = False  # Flag to indicate if this is the correct version if true display 1 and 3, if false display 1 and 2
    versions: List[CodeVersion]  # List of code versions
    
class Level(BaseModel):
    difficulty: str
    number_of_mistakes: int
    mistakes_found: int
    lines: List[CodeLine]
    readme: str

class UserInteraction(BaseModel):
    code: Level
    user_input: str