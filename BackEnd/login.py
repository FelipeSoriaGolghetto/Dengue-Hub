from fastapi import FastAPI, HTTPException
from pydantic import BaseModel
import psycopg2
from typing import List
from database import get_db_connection
from typing import Optional
from datetime import date
from fastapi.middleware.cors import CORSMiddleware
from models import User, Registration, Article
from fastapi import APIRouter

router = APIRouter()

@router.get("", response_model=User)
def validade_user_in_login(user_email: str, user_password: str):
    print('alou')
    conn = get_db_connection()
    cur = conn.cursor()
    
    # Buscar o usuário pelo email
    cur.execute("SELECT * from users where user_email = %s and password = %s and status = 'Authenticated' ;", (user_email,user_password))
    user_result = cur.fetchone()
    cur.close()
    conn.close()
    
    if user_result is None:
        raise HTTPException(status_code=404, detail="User not found")
    
    user = User(
        id_user=user_result[0],
        user_email=user_result[1],
        user_name=user_result[2],
        user_role=user_result[3],
        password=user_result[4],
        sign_up_date=str(user_result[5]),
        status=user_result[6],
        wiki_role=user_result[7]
    )

    
    return user