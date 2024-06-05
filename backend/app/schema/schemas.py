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
    def serialize_file(file):
        return{
            "filename" : file["filename"],
            "lines": [serialize_code_line(line) for line in file["lines"]]
        }

    return {
        "id": str(level["_id"]),
        "repo": level["repo"],
        "number_of_mistakes": level["number_of_mistakes"],
        "mistakes_found": level["mistakes_found"],
        "files":[serialize_file(file) for file in level["files"]],
        "readme": level.get("readme")
    }

def list_seriallevels(levels) -> list:
    return [individual_seriallevel(level) for level in levels]
