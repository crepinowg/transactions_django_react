from fastapi import APIRouter, HTTPException, Depends
from app.schemas.operation import OperationCreate, OperationOut
from app.models.operation import create_operation
from app.core.database import db
from app.core.deps import get_current_user
from bson import ObjectId

router = APIRouter(prefix="/operations", tags=["Operations"])

@router.post("/", response_model=OperationOut)
async def create_new_operation(
    operation: OperationCreate,
    current_user: dict = Depends(get_current_user)  
):
    operation_dict = create_operation(
        client_id=operation.client_id,
        user_id=str(current_user["_id"]),  
        amount=operation.amount,
        description=operation.description
    )
    result = await db.operations.insert_one(operation_dict)

    operation_dict["id"] = str(result.inserted_id)
    operation_dict["client_id"] = str(operation_dict["client_id"])
    operation_dict["user_id"] = str(operation_dict["user_id"])
    return operation_dict

@router.get("/", response_model=list[OperationOut])
async def get_operations():
    operations = []
    async for op in db.operations.find():
        op["id"] = str(op["_id"])
        op["client_id"] = str(op["client_id"])
        op["user_id"] = str(op["user_id"])
        operations.append(op)
    return operations

@router.get("/{operation_id}", response_model=OperationOut)
async def get_operation(operation_id: str):
    op = await db.operations.find_one({"_id": ObjectId(operation_id)})
    if not op:
        raise HTTPException(status_code=404, detail="Operation non trouvée")
    op["id"] = str(op["_id"])
    op["client_id"] = str(op["client_id"])
    op["user_id"] = str(op["user_id"])
    return op

@router.delete("/{operation_id}")
async def delete_operation(operation_id: str):
    result = await db.operations.delete_one({"_id": ObjectId(operation_id)})
    if result.deleted_count == 0:
        raise HTTPException(status_code=404, detail="Operation non trouvée")
    return {"detail": "Operation supprimée"}