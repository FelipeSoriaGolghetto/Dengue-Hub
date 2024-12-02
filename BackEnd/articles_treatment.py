from fastapi import FastAPI, HTTPException
from pydantic import BaseModel
import psycopg2
from typing import List
from database import get_db_connection
from typing import Optional
from datetime import date
from fastapi.middleware.cors import CORSMiddleware
from models import ArticleSlug, User, Registration, Article
from fastapi import APIRouter


router = APIRouter()

@router.post("", response_model=Article)
def create_article(article: Article):
    conn = get_db_connection()
    cur = conn.cursor()
    cur.execute(
        "INSERT INTO articles_treatment (title, content, author_id, created_at) VALUES (%s, %s, %s, %s) RETURNING id;",
        (article.title, article.content, article.author_id, date.today().isoformat())
    )
    id = cur.fetchone()[0]
    conn.commit()
    cur.close()
    conn.close()
    article.id = id
    return article

@router.get("/slugs", response_model=List[ArticleSlug])
def get_article_slugs():
    try:
        conn = get_db_connection()  # Obtenha a conexão com o banco
        cur = conn.cursor()
        
        # Execute a consulta para obter os slugs
        cur.execute("SELECT id FROM articles_treatment")
        slugs = cur.fetchall()

        # Transforme os resultados em uma lista de dicionários
        slug_list = [{"slug": str(row[0])} for row in slugs]
        
        # Retorne a lista no formato esperado
        return slug_list
    finally:
        # Certifique-se de fechar o cursor e a conexão
        cur.close()
        conn.close()

@router.get("/{id}", response_model=Article)
def read_article(id: int):
    conn = get_db_connection()
    cur = conn.cursor()
    cur.execute("SELECT * FROM articles_treatment WHERE id = %s;", (id,))
    article = cur.fetchone()
    cur.close()
    conn.close()
    
    if article is None:
        raise HTTPException(status_code=404, detail="Article not found")
    
    return Article(id=article[0], title=article[1], content=article[2], author_id=article[3], created_at=article[4])

@router.put("/{id}", response_model=Article)
def update_article(id: int, article: Article):
    conn = get_db_connection()
    cur = conn.cursor()
    cur.execute(
        "UPDATE articles_treatment SET title = %s, content = %s WHERE id = %s;",
        (article.title, article.content, id)
    )
    conn.commit()
    cur.execute("SELECT * FROM articles_treatment WHERE id = %s;", (id,))
    updated_article = cur.fetchone()

    cur.close()
    conn.close()
    return Article(id=updated_article[0], title=updated_article[1], content=updated_article[2], author_id=updated_article[3], created_at=updated_article[4])


@router.delete("/{id}")
def delete_article(id: int):
    conn = get_db_connection()
    cur = conn.cursor()
    cur.execute("SELECT * FROM articles_treatment WHERE id = %s;", (id,))
    article = cur.fetchone()
    
    if article is None:
        cur.close()
        conn.close()
        raise HTTPException(status_code=404, detail="Article not found")
    
    cur.execute("DELETE FROM articles_treatment WHERE id = %s;", (id,))
    conn.commit()
    cur.close()
    conn.close()

    return {"message" : "Recurso deletado com sucesso."}

