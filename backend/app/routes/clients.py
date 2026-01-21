from fastapi import APIRouter, HTTPException, Depends
from app.schemas.client import ClientCreate, ClientOut
from app.models.clients import create_client
from app.core.database import db
from app.core.deps import get_current_user
from bson import ObjectId

router = APIRouter(prefix="/clients", tags=["Clients"])
STATIC_USER_ID = "69612d1887ef80b5480dd435"


from fastapi import APIRouter, HTTPException
from app.schemas.client import ClientCreate, ClientOut
from app.models.clients import create_client
from app.core.database import db

router = APIRouter(prefix="/clients", tags=["Clients"])

# ID statique du user
STATIC_USER_ID = "69612d1887ef80b5480dd435"

# CREATE
@router.post("/", response_model=ClientOut)
async def create_new_client(client: ClientCreate):
    client_dict = create_client(
        user_id=STATIC_USER_ID,  
        name=client.name,
        surname=client.surname,
        sex=client.sex,
        birth_date=client.birth_date,
        email=client.email,
        phone=client.phone,
        address=client.address,
        balance=client.balance,
        cni_id=client.cni_id
    )
    result = await db.clients.insert_one(client_dict)

    client_dict["id"] = str(result.inserted_id)
    client_dict["user_id"] = str(client_dict["user_id"])
    return client_dict

@router.get("/", response_model=list[ClientOut])
async def get_clients():
    clients = []
    async for c in db.clients.find():
        c["id"] = str(c["_id"])
        c["user_id"] = str(c["user_id"])
        clients.append(c)
    return clients

@router.get("/{client_id}", response_model=ClientOut)
async def get_client(client_id: str):
    client = await db.clients.find_one({"_id": ObjectId(client_id)})
    if not client:
        raise HTTPException(status_code=404, detail="Client non trouvé")
    client["id"] = str(client["_id"])
    client["user_id"] = str(client["user_id"])
    return client

@router.delete("/{client_id}")
async def delete_client(client_id: str):
    result = await db.clients.delete_one({"_id": ObjectId(client_id)})
    if result.deleted_count == 0:
        raise HTTPException(status_code=404, detail="Client non trouvé")
    return {"detail": "Client supprimé"}