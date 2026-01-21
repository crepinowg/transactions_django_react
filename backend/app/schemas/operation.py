from pydantic import BaseModel
from datetime import datetime

class OperationCreate(BaseModel):
    client_id: str
    user_id: str
    amount: float
    description: str

class OperationOut(BaseModel):
    id: str
    client_id: str
    user_id: str
    amount: float
    type: str
    description: str
    created_at: datetime