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



@router.post("/", response_model=User)
def create_user(user:User):
    conn = get_db_connection()
    cur = conn.cursor()
    cur.execute(
        "INSERT INTO Users (user_email, user_name, user_role, password, status, sign_up_date, wiki_role) VALUES (%s, %s, %s, %s, 'Pending', %s, 'Pending') RETURNING id_user;",
        (user.user_email, user.user_name, user.user_role, user.password, date.today().isoformat())
    )
    user_id = cur.fetchone()[0]
    conn.commit()
    cur.close()
    conn.close()
    user.id_user = user_id
    return user



@router.get("/", response_model=List[User])
def read_user(id_user: Optional[int] = None, user_name: Optional[str] = None, status: Optional[str] = None):
    conn = get_db_connection()
    cur = conn.cursor()
    base_query = "SELECT * FROM Users"
    filters = []
    if id_user:
        filters.append("id_user = " + str(id_user))
    if user_name:
        filters.append("user_name = '" + user_name + "'")
    if status:
        filters.append("status = '" + status + "'")
    if filters:
        base_query += " WHERE " + " AND ".join(filters) + ";"

    print(base_query)
    cur.execute(base_query, (id_user, user_name, status))
    print(id_user, user_name, status)
    users = cur.fetchall()
    cur.close()
    conn.close()
    
    if users is None:
        raise HTTPException(status_code=404, detail="User not found")    
    users_list = []
    for user in users:
        users_list.append({
            "id_user": user[0],
            "user_email": user[1],
            "user_name": user[2],
            "user_role": user[3],
            "password": user[4],
            "sign_up_date": user[5].isoformat() if user[5] else None,
            "status": user[6],
            "wiki_role": user[7]
        })
    
    return users_list


@router.patch("/authenticate/{user_id}")
def authenticate_user(user_id: int):
    conn = get_db_connection()
    cur = conn.cursor()
    cur.execute(
        "UPDATE users SET status = 'Authenticated', wiki_role = 'Editor' WHERE id_user = %s;",(user_id,)
    )
    conn.commit()
    cur.close()
    conn.close()
    return {"message": "User updated successfully"}

@router.patch("/reject/{user_id}")
def authenticate_user(user_id: int):
    conn = get_db_connection()
    cur = conn.cursor()
    cur.execute(
        "UPDATE users SET status = 'Rejected' WHERE id_user = %s;",(user_id,)
    )
    conn.commit()
    cur.close()
    conn.close()
    return {"message": "User updated successfully"}

@router.put("/{user_id}", response_model=User)
def update_user(user_id: int, user: User):
    conn = get_db_connection()
    cur = conn.cursor()
    cur.execute(
        "UPDATE Users SET user_email = %s, user_name = %s, user_role = %s WHERE id_user = %s;",
        (user.user_email, user.user_name, user.user_role, user_id)
    )
    conn.commit()
    cur.close()
    conn.close()
    user.id_user = user_id
    return user

@router.delete("/{user_id}", response_model=User)
def delete_user(user_id: int):
    conn = get_db_connection()
    cur = conn.cursor()
    cur.execute("SELECT * FROM Users WHERE id_user = %s;", (user_id,))
    user = cur.fetchone()
    
    if user is None:
        cur.close()
        conn.close()
        raise HTTPException(status_code=404, detail="User not found")
    
    cur.execute("DELETE FROM Users WHERE id_user = %s;", (user_id,))
    conn.commit()
    cur.close()
    conn.close()
    
    return User(id_user=user[0], user_email=user[1], user_name=user[2], user_role=user[3])
