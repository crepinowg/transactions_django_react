from fastapi import APIRouter, HTTPException, Depends
from app.schemas.user import UserCreate, UserOut, UserLogin
from app.models.user import create_user
from app.core.database import db
from app.core.deps import get_current_user 

router = APIRouter(prefix="/users", tags=["Users"])

router = APIRouter(prefix="/users", tags=["Users"])

STATIC_USER_ID = "69612d1887ef80b5480dd435"

@router.post("/register", response_model=UserOut)
async def register(user: UserCreate):
    if await db.users.find_one({"email": user.email}):
        raise HTTPException(status_code=400, detail="Email déjà utilisé")
    
    user_dict = create_user(email=user.email, password_hash=user.password, name=user.name)
    
    result = await db.users.insert_one(user_dict)
    
    response_user = {
        "id": str(result.inserted_id),
        "email": user_dict["email"],
        "name": user_dict["name"]
    }
    
    return response_user

@router.post("/login", response_model=UserOut)
async def login(user: UserLogin):
    db_user = await db.users.find_one({"email": user.email})
    
    if not db_user or db_user["password_hash"] != user.password:
        raise HTTPException(status_code=401, detail="Email ou mot de passe incorrect")
    
    response_user = {
        "id": str(db_user["_id"]),
        "email": db_user["email"],
        "name": db_user["name"]
    }
    
    return response_user

@router.get("/me", response_model=UserOut)
async def read_me(current_user: dict = Depends(get_current_user)):
    current_user["id"] = str(current_user["_id"])
    return current_user