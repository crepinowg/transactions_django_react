from pydantic_settings import BaseSettings

class Settings(BaseSettings):
    MONGO_URI: str = "mongodb+srv://toviawoukplolacrepin:vz564XWGrTDr9bkl@cluster0.newlv.mongodb.net/?appName=Cluster0"
    MONGO_DB: str = "solimi_wallet"
    JWT_SECRET: str = "123456789"
    jwt_algorithm: str = "HS256"
    jwt_expire_minutes: int = 60

settings = Settings()