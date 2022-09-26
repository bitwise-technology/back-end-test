from fastapi import FastAPI

from core.configs import settings
from api.v1.api import api_router

app: FastAPI = FastAPI(
    title='Teste Back-end - FastAPI',
    version='0.0.1',
    description='Uma api de teste para desenvolvedor back-end ultilizando FastAPI.'
)
app.include_router(api_router, prefix=settings.API_V1_STR)

if __name__ == '__main__':
    import uvicorn

    uvicorn.run("main:app", host="localhost", port=8000, log_level='info', reload=True)