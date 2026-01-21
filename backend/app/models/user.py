from datetime import datetime
from bson import ObjectId

def create_user(email: str, password_hash: str, name: str, role: str = "user"):
    return {
        "email": email,
        "password_hash": password_hash,
        "name": name,
        "role": role,
        "created_at": datetime.utcnow()
    }