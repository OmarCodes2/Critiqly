def individual_seriallevel(level) -> dict:
    def serialize_code_line(line):
        return {
            "line_number": line["line_number"],
            "is_modified": line["is_modified"],
            "is_correct": line["is_correct"],
            "versions": [
                {
                    "id": version["id"],
                    "code": version["code"],
                } for version in line["versions"]
            ]
        }

    return {
        "id": str(level["_id"]),
        "difficulty": level["difficulty"],
        "lines": [serialize_code_line(line) for line in level["lines"]],
        "readme": level.get("readme")
    }

def list_seriallevels(levels) -> list:
    return [individual_seriallevel(level) for level in levels]
