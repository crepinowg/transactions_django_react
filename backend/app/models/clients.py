from datetime import datetime
from bson import ObjectId

def create_client(user_id: str, balance: float, name: str, surname: str, sex: str, birth_date: str, email: str, phone: str, address: str, cni_id: str):
    return {
        "user_id": ObjectId(user_id),
        "name": name,
        "surname": surname,
        "sex": sex,
        "birth_date": birth_date,
        "email": email,
        "phone": phone,
        "address": address,
        "cni_id": cni_id,
        "balance": 0,
        "created_at": datetime.now()
    }