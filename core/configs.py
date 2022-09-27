from pydantic import BaseSettings

# BANCO CONFIG
BD_USER = "youruser"
BD_PASSWORD = "yourpassword"
BD_BANCO = "yourbanco"

class Settings(BaseSettings):
    API_V1_STR: str = '/api/v1'
    DB_URL: str = "postgresql+asyncpg://" + BD_USER + ":" + BD_PASSWORD + "@localhost:5432/" + BD_BANCO
    BASE_URL_GITHUB = 'https://api.github.com'

    class Config:
        case_sensitive = True

settings: Settings = Settings()