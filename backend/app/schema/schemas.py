def individual_serial(todo) -> dict:
    return {
        "id": str(todo["_id"]),
        "name": todo["name"],
        "description": todo["description"],
        "complete": todo["complete"],
    }
    
def individual_seriallevel(todo) -> dict:
    return {
        "id": str(todo["_id"]),
        "difficulty": todo["difficulty"],
        "code": todo["code"],
        "mistakes": todo["mistakes"],
    }
    
def list_serial(todos) -> list:
    return[individual_serial(todo) for todo in todos]

def list_level(todos) -> list:
    return[individual_seriallevel(todo) for todo in todos]