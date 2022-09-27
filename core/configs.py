from pydantic import BaseSettings

class Settings(BaseSettings):
    API_V1_STR: str = '/api/v1'
    DB_URL: str = 'postgresql+asyncpg://postgres:220641@localhost:5432/banco_teste'
    BASE_URL_GITHUB = 'https://api.github.com'

    class Config:
        case_sensitive = True

settings: Settings = Settings()