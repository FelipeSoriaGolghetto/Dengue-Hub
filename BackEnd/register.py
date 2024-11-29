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





@router.get("/login", response_model=User)
def validade_user_in_login(user_email: str, user_password: str):
    print('alou')
    conn = get_db_connection()
    cur = conn.cursor()
    
    # Buscar o usuário pelo email
    cur.execute("SELECT * from users where user_email = %s and password = %s ;", (user_email,user_password))
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
        sign_up_date=user_result[5],
        status=user_result[6],
        wiki_role=user_result[7]
    )

    
    return user
    
@router.post("/registrations/", response_model=Registration)
def create_registration(registration: Registration):
    conn = get_db_connection()
    cur = conn.cursor()
    cur.execute(
        "INSERT INTO Registrations (id_registration, role, email, user_name, sign_up_date, aprover_id, status) VALUES (%s, %s, %s, %s, %s, %s, %s) RETURNING id_registration;",
        (registration.id_registration, registration.role, registration.email, registration.user_name, registration.sign_up_date, registration.aprover_id, registration.status)
    )
    registration_id = cur.fetchone()[0]
    conn.commit()
    cur.close()
    conn.close()
    registration.id_registration = registration_id
    return registration

@router.get("/registrations/{registration_id}", response_model=Registration)
def read_registration(registration_id: int):
    conn = get_db_connection()
    cur = conn.cursor()
    cur.execute("SELECT * FROM Registrations WHERE id_registration = %s;", (registration_id,))
    registration = cur.fetchone()
    cur.close()
    conn.close()
    
    if registration is None:
        raise HTTPException(status_code=404, detail="Registration not found")
    
    return Registration(id_registration=registration[0], role=registration[1], email=registration[2], user_name=registration[3], sign_up_date=registration[4], aprover_id=registration[5], status=registration[6])

@router.put("/registrations/{registration_id}", response_model=Registration)
def update_registration(registration_id: int, registration: Registration):
    conn = get_db_connection()
    cur = conn.cursor()
    cur.execute(
        "UPDATE Registrations SET role = %s, email = %s, user_name = %s, sign_up_date = %s, aprover_id = %s, status = %s WHERE id_registration = %s;",
        (registration.role, registration.email, registration.user_name, registration.sign_up_date, registration.aprover_id, registration.status, registration_id)
    )
    conn.commit()
    cur.close()
    conn.close()
    registration.id_registration = registration_id
    return registration

@router.delete("/registrations/{registration_id}", response_model=Registration)
def delete_registration(registration_id: int):
    conn = get_db_connection()
    cur = conn.cursor()
    cur.execute("SELECT * FROM Registrations WHERE id_registration = %s;", (registration_id,))
    registration = cur.fetchone()
    
    if registration is None:
        cur.close()
        conn.close()
        raise HTTPException(status_code=404, detail="Registration not found")
    
    cur.execute("DELETE FROM Registrations WHERE id_registration = %s;", (registration_id,))
    conn.commit()
    cur.close()
    conn.close()
    
    return Registration(id_registration=registration[0], role=registration[1], email=registration[2], user_name=registration[3], sign_up_date=registration[4], aprover_id=registration[5], status=registration[6])

