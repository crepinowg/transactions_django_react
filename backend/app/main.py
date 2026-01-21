from fastapi import FastAPI
from app.routes import users, clients, operations

app = FastAPI(title="SOLIMI WALLET API")

app.include_router(users.router)
app.include_router(clients.router)
app.include_router(operations.router)