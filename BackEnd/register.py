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






@router.post("", response_model=Registration)
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

@router.get("{registration_id}", response_model=Registration)
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

@router.put("{registration_id}", response_model=Registration)
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

@router.delete("{registration_id}", response_model=Registration)
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

