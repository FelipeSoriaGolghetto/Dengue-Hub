from fastapi import FastAPI, HTTPException
from pydantic import BaseModel
import psycopg2
from typing import List
from database import get_db_connection
from typing import Optional
from datetime import date
from fastapi.middleware.cors import CORSMiddleware
from models import User, Registration, Article
from articles_mosquito import router as articles_mosquito_router
from articles_prevention import router as articles_prevention_router
from articles_treatment import router as articles_treatment_router
from users import router as users_router
from register import router as register_router
from login import router as login_router

# node_modules/@next/swc-darwin-arm64/next-swc.darwin-arm64.node

app = FastAPI()

app.include_router(articles_mosquito_router, prefix="/articles/mosquito", tags=["Mosquito Articles"])
app.include_router(articles_prevention_router, prefix="/articles/prevention", tags=["Prevention Articles"])
app.include_router(articles_treatment_router, prefix="/articles/treatment", tags=["Treatment Articles"])
app.include_router(users_router, prefix="/users", tags=["Users"])
app.include_router(register_router, prefix="/registrations", tags=["Registrations"])
app.include_router(login_router, prefix="/login", tags=["Login"])


app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],  # Defina os domínios permitidos (ou '*' para todos)
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)



