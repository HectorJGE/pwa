from pydantic_settings import BaseSettings

class Settings(BaseSettings):
    DB_URL: str = "postgresql://user:password@localhost:5432/mi_db"
    SECRET_KEY: str = "clave_super_secreta"
    ALGORITHM: str = "HS256"
    ACCESS_TOKEN_EXPIRE_MINUTES: int = 30

    BELVO_CLIENT_ID: str
    BELVO_CLIENT_SECRET: str
    BELVO_BASE_URL: str

    class Config:
        env_file = ".env"
        extra = "allow"  # Permitir campos adicionales
    

settings = Settings()
