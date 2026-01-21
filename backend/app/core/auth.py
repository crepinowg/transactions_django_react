from datetime import datetime, timedelta
from jose import jwt
from passlib.hash import bcrypt
from app.core.config import settings

def hash_password(password: str):
    return bcrypt.hash(password)

def verify_password(password: str, hashed: str):
    return bcrypt.verify(password, hashed)

def create_access_token(data: dict, expires_delta: int = None):
    to_encode = data.copy()
    expire = datetime.utcnow() + timedelta(minutes=expires_delta or settings.jwt_expire_minutes)
    to_encode.update({"exp": expire})
    encoded_jwt = jwt.encode(to_encode, settings.jwt_secret, algorithm=settings.jwt_algorithm)
    return encoded_jwt

def decode_access_token(token: str):
    from jose import JWTError
    try:
        payload = jwt.decode(token, settings.jwt_secret, algorithms=[settings.jwt_algorithm])
        return payload
    except JWTError:
        return None