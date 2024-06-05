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
    
class File(BaseModel):
    filename: str  # Name of the file
    lines: List[CodeLine]  # List of code lines in the file

class Level(BaseModel):
    repo: str
    number_of_mistakes: int
    mistakes_found: int
    files: List[File]  # List of files in the level
    readme: str

class UserInteraction(BaseModel):
    code: Level
    user_input: str
    file_number: int