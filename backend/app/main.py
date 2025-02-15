from fastapi import FastAPI
from .routes import banks, users
from . import models
from .database import engine
from fastapi.middleware.cors import CORSMiddleware

models.Base.metadata.create_all(bind=engine)

app = FastAPI()

origins = [
    "http://localhost:3000", 
    "https://teamb.com.py",
    "http://teamb.com.py"
]

app.add_middleware(
    CORSMiddleware,
    allow_origins=origins,  
    allow_credentials=True,
    allow_methods=["*"],  
    allow_headers=["*"], 
)

app.title = "PWA API"

app.include_router(banks.router)

app.include_router(users.router)