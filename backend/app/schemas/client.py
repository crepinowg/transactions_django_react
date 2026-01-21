from pydantic import BaseModel
from datetime import datetime

class ClientCreate(BaseModel):
    user_id: str
    name: str
    phone: str
    balance: float = 0.0
    surname: str
    sex: str
    birth_date: str
    email: str
    address: str
    cni_id: str


class ClientOut(BaseModel):
    id: str
    user_id: str
    name: str
    phone: str
    balance: float
    created_at: datetime
    surname: str
    sex: str
    birth_date: str
    email: str
    address: str
    cni_id: str