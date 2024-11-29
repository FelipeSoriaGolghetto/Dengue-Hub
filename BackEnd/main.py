from fastapi import FastAPI, HTTPException
from fastapi.responses import RedirectResponse
from pydantic import BaseModel
import psycopg2
from typing import List
from database import get_db_connection
from typing import Optional
from datetime import date
from fastapi.middleware.cors import CORSMiddleware
from models import User, Registration, WebPageArticle, ArticleChangeHistory

TAG_NOVAS_ROTAS = "Novas rotas"

app = FastAPI(
    title="Dengue Hub",
    docs_url="/docs"
)

app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],  # Defina os domínios permitidos (ou '*' para todos)
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

# Redirecionar de "/" para "/docs"
@app.get("/", include_in_schema=False)  # Exclui essa rota da documentação Swagger
async def redirect_to_docs():
    return RedirectResponse(url="/docs")

@app.post("/users/", response_model=User)
def create_user(user:User):
    conn = get_db_connection()
    cur = conn.cursor()
    cur.execute(
        "INSERT INTO Users (user_email, user_name, user_role, password, status) VALUES (%s, %s, %s, %s, 'Pending') RETURNING id_user;",
        (user.user_email, user.user_name, user.user_role, user.password)
    )
    user_id = cur.fetchone()[0]
    conn.commit()
    cur.close()
    conn.close()
    user.id_user = user_id
    return user

@app.get("/users/", response_model=List[User])
def read_user(user_id: Optional[int] = None, user_name: Optional[str] = None):
    conn = get_db_connection()
    cur = conn.cursor()
    if user_id is None and user_name is None:
        raise HTTPException(status_code=400, detail="Informe 'id' ou 'name' como parâmetro de busca.")
    if user_id is not None and user_name is None:
        cur.execute("SELECT * FROM Users WHERE id_user = %s;", (user_id,))
    else:
        cur.execute("SELECT * FROM Users WHERE user_name = %s;", (user_name,))
    users = cur.fetchall()
    cur.close()
    conn.close()
    
    if users is None:
        raise HTTPException(status_code=404, detail="User not found")
    print (users)
    
    users_list = []
    for user in users:
        users_list.append({
            "id_user": user[0],
            "user_email": user[1],
            "user_name": user[2],
            "user_role": user[3],
            "password": user[4],
            "sign_up_date": user[5],
            "status": user[6],
            "wiki_role": user[7]
        })

    print (users_list)

    
    return users_list


@app.patch("/users/{user_id}/authenticate")
def authenticate_user(user_id: int):
    conn = get_db_connection()
    cur = conn.cursor()
    cur.execute(
        "UPDATE users SET status = 'Authenticated' WHERE id_user = %s;",(user_id,)
    )
    conn.commit()
    cur.close()
    conn.close()

@app.patch("/users/{user_id}/reject")
def authenticate_user(user_id: int):
    conn = get_db_connection()
    cur = conn.cursor()
    cur.execute(
        "UPDATE users SET status = 'Rejected' WHERE id_user = %s;",(user_id,)
    )
    conn.commit()
    cur.close()
    conn.close()

@app.put("/users/{user_id}", response_model=User)
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

@app.delete("/users/{user_id}", response_model=User)
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


@app.get("/login", response_model=User)
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
    
@app.post("/registrations/", response_model=Registration)
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

@app.get("/registrations/{registration_id}", response_model=Registration)
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

@app.put("/registrations/{registration_id}", response_model=Registration)
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

@app.delete("/registrations/{registration_id}", response_model=Registration)
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


@app.post("/articles/", response_model=WebPageArticle)
def create_article(article: WebPageArticle):
    conn = get_db_connection()
    cur = conn.cursor()
    cur.execute(
        "INSERT INTO Web_Page_Articles (id_article, text, previous_id, id_user, Image) VALUES (%s, %s, %s, %s, %s) RETURNING id_article;",
        (article.id_article, article.text, article.previous_id, article.id_user, article.image)
    )
    article_id = cur.fetchone()[0]
    conn.commit()
    cur.close()
    conn.close()
    article.id_article = article_id
    return article

@app.get("/articles/{article_id}", response_model=WebPageArticle)
def read_article(article_id: int):
    conn = get_db_connection()
    cur = conn.cursor()
    cur.execute("SELECT * FROM Web_Page_Articles WHERE id_article = %s;", (article_id,))
    article = cur.fetchone()
    cur.close()
    conn.close()
    
    if article is None:
        raise HTTPException(status_code=404, detail="Article not found")
    
    return WebPageArticle(id_article=article[0], text=article[1], previous_id=article[2], id_user=article[3], image=article[4])

@app.put("/articles/{article_id}", response_model=WebPageArticle)
def update_article(article_id: int, article: WebPageArticle):
    conn = get_db_connection()
    cur = conn.cursor()
    cur.execute(
        "UPDATE Web_Page_Articles SET text = %s, previous_id = %s, id_user = %s, Image = %s WHERE id_article = %s;",
        (article.text, article.previous_id, article.id_user, article.image, article_id)
    )
    conn.commit()
    cur.close()
    conn.close()
    article.id_article = article_id
    return article

@app.delete("/articles/{article_id}", response_model=WebPageArticle)
def delete_article(article_id: int):
    conn = get_db_connection()
    cur = conn.cursor()
    cur.execute("SELECT * FROM Web_Page_Articles WHERE id_article = %s;", (article_id,))
    article = cur.fetchone()
    
    if article is None:
        cur.close()
        conn.close()
        raise HTTPException(status_code=404, detail="Article not found")
    
    cur.execute("DELETE FROM Web_Page_Articles WHERE id_article = %s;", (article_id,))
    conn.commit()
    cur.close()
    conn.close()
    
    return WebPageArticle(id_article=article[0], text=article[1], previous_id=article[2], id_user=article[3], image=article[4])

@app.post("/articles_changes/", response_model=ArticleChangeHistory)
def create_article_change(change: ArticleChangeHistory):
    conn = get_db_connection()
    cur = conn.cursor()
    cur.execute(
        "INSERT INTO Articles_Changes_History (modification_id, text, previous_id, id_user, Image) VALUES (%s, %s, %s, %s, %s) RETURNING modification_id;",
        (change.modification_id, change.text, change.previous_id, change.id_user, change.image)
    )
    modification_id = cur.fetchone()[0]
    conn.commit()
    cur.close()
    conn.close()
    change.modification_id = modification_id
    return change

@app.get("/articles_changes/{modification_id}", response_model=ArticleChangeHistory)
def read_article_change(modification_id: int):
    conn = get_db_connection()
    cur = conn.cursor()
    cur.execute("SELECT * FROM Articles_Changes_History WHERE modification_id = %s;", (modification_id,))
    change = cur.fetchone()
    cur.close()
    conn.close()
    
    if change is None:
        raise HTTPException(status_code=404, detail="Change not found")
    
    return ArticleChangeHistory(modification_id=change[0], text=change)

@app.get("/articles/", response_model=List[WebPageArticle], tags= [TAG_NOVAS_ROTAS])
def get_articles():
    conn = get_db_connection()
    cur = conn.cursor()
    cur.execute("SELECT id_article, text, previous_id, id_user, image FROM Web_Page_Articles;")
    articles = cur.fetchall()
    cur.close()
    conn.close()
    
    articles_list = []
    for article in articles:
        articles_list.append({
            "id_article": article[0],
            "text": article[1],
            "previous_id": article[2],
            "id_user": article[3],
            "image": article[4]
        })
    
    return articles_list

@app.get("/articles/{slug}", response_model=WebPageArticle, tags=[TAG_NOVAS_ROTAS])
def get_article_by_slug(slug: str):
    conn = get_db_connection()
    cur = conn.cursor()
    cur.execute("SELECT id_article, text, previous_id, id_user, image FROM Web_Page_Articles WHERE id_article = %s;", (slug,))
    article = cur.fetchone()
    cur.close()
    conn.close()
    
    if article is None:
        raise HTTPException(status_code=404, detail="Article not found")
    
    return {
        "id_article": article[0],
        "text": article[1],
        "previous_id": article[2],
        "id_user": article[3],
        "image": article[4]
    }

