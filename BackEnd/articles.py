from fastapi import FastAPI, HTTPException, APIRouter
from pydantic import BaseModel
from typing import List, Optional
from database import get_db_connection
from models import Article, ArticleSlug
import os

router = APIRouter()

# Diretório para salvar os arquivos de conteúdo
CONTENT_DIR = 'articles-contents'
os.makedirs(CONTENT_DIR, exist_ok=True)

def save_file_locally(file_content, file_name):
    file_path = os.path.join(CONTENT_DIR, file_name)
    with open(file_path, 'w', encoding='utf-8') as file:
        file.write(file_content)
    return file_path

@router.post("/", response_model=int)
def create_article(article: Article):
    conn = get_db_connection()
    cur = conn.cursor()
    
    # Inserir o artigo no banco de dados e obter o ID gerado
    cur.execute(
        "INSERT INTO articles (title, category, author_id) VALUES (%s, %s, %s) RETURNING id;",
        (article.title, article.category, article.author_id)
    )
    id = cur.fetchone()[0]
    
    # Salvar o conteúdo em markdown em um arquivo
    file_name = f"{id}.md"
    file_path = save_file_locally(article.content, file_name)
    
    # Atualizar o registro do artigo com o caminho do arquivo
    cur.execute(
        "UPDATE articles SET content = %s WHERE id = %s;",
        (file_path, id)
    )
    conn.commit()
    
    cur.close()
    conn.close()
    return id

@router.get("/slugs", response_model=List[ArticleSlug])
def get_article_slugs(category: str = None):
    try:
        conn = get_db_connection()  # Obtenha a conexão com o banco
        cur = conn.cursor()
        
        # Execute a consulta para obter os slugs e títulos
        if category is not None:
            cur.execute("SELECT id, title FROM articles WHERE category = %s;", (category,))
        else:
            cur.execute("SELECT id, title FROM articles")
        articles = cur.fetchall()

        # Transforme os resultados em uma lista de dicionários
        article_list = [{"slug": str(row[0]), "title": row[1]} for row in articles]
        
        # Retorne a lista no formato esperado
        return article_list
    finally:
        # Certifique-se de fechar o cursor e a conexão
        cur.close()
        conn.close()

@router.get("/", response_model=List[Article])
def read_article(id: Optional[int] = None, title: Optional[str] = None):
    conn = get_db_connection()
    cur = conn.cursor()
    
    if id is not None:
        cur.execute("SELECT * FROM articles WHERE id = %s;", (id,))
        article = cur.fetchone()
        if article is None:
            raise HTTPException(status_code=404, detail="Article not found")
        articles = [article]
    elif title is not None:
        cur.execute("SELECT * FROM articles WHERE title = %s;", (title,))
        article = cur.fetchone()
        if article is None:
            raise HTTPException(status_code=404, detail="Article not found")
        articles = [article]
    else:
        cur.execute("SELECT * FROM articles")
        articles = cur.fetchall()
    
    cur.close()
    conn.close()
    
    # Recuperar o conteúdo do arquivo
    article_list = []
    for article in articles:
        with open(article[3], 'r', encoding='utf-8') as file:
            file_content = file.read()
        article_dict = {
            "id": article[0],
            "title": article[2],
            "category": article[1],
            "content": file_content,
            "author_id": article[4],
            "created_at": article[5]
        }
        article_list.append(article_dict)
    
    return [Article(**article) for article in article_list]

@router.put("/{id}", response_model=Article)
def update_article(id: int, article: Article):
    conn = get_db_connection()
    cur = conn.cursor()
    
    # Atualizar o conteúdo em markdown no arquivo
    file_name = f"{id}.md"
    file_path = save_file_locally(article.content, file_name)
    
    cur.execute(
        "UPDATE articles SET title = %s, category = %s, content = %s WHERE id = %s;",
        (article.title, article.category, file_path, id)
    )
    conn.commit()
    cur.execute("SELECT * FROM articles WHERE id = %s;", (id,))
    updated_article = cur.fetchone()

    cur.close()
    conn.close()
    if updated_article is None:
        raise HTTPException(status_code=404, detail="Article not found")
    return Article(id=updated_article[0], title=updated_article[1], category=updated_article[2], content=article.content, author_id=updated_article[4], created_at=updated_article[5])


@router.delete("/{id}")
def delete_article(id: int):
    conn = get_db_connection()
    cur = conn.cursor()
    cur.execute("SELECT * FROM articles WHERE id = %s;", (id,))
    article = cur.fetchone()
    
    if article is None:
        cur.close()
        conn.close()
        raise HTTPException(status_code=404, detail="Article not found")
    
    # Remover o arquivo de conteúdo
    file_path = article[3]
    if os.path.exists(file_path):
        os.remove(file_path)
    
    cur.execute("DELETE FROM articles WHERE id = %s;", (id,))
    conn.commit()
    cur.close()
    conn.close()

    return {"message" : "Recurso deletado com sucesso."}