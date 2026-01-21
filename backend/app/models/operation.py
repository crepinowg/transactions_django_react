from datetime import datetime
from bson import ObjectId

def create_operation(client_id: str, user_id: str, amount: float, description: str):
    return {
        "client_id": ObjectId(client_id),
        "user_id": ObjectId(user_id),
        "amount": amount,
        "type": "income" if amount > 0 else "expense",
        "description": description,
        "created_at": datetime.now()
    }