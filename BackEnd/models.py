# Modelos para os dados
from datetime import date, datetime
from typing import Optional
from pydantic import BaseModel


class User(BaseModel):
    id_user: Optional[int]
    user_email: Optional[str]
    user_name: Optional[str]
    user_role: Optional[str]
    password: Optional[str]
    sign_up_date: Optional[str]
    status: Optional[str]
    wiki_role: Optional[str]

# Modelo para Registrations
class Registration(BaseModel):
    id_registration: int
    role: str
    email: str
    user_name: str
    sign_up_date: date
    aprover_id: Optional[int]  # Pode ser None
    status: str

# Modelo para Web_Page_Articles
class WebPageArticle(BaseModel):
    id_article: int
    text: str
    previous_id: int
    id_user: int
    image: Optional[bytes]  # Pode ser None

# Modelo para Articles_Changes_History
class ArticleChangeHistory(BaseModel):
    modification_id: int
    text: str
    previous_id: int
    id_user: int
    image: Optional[bytes]  # Pode ser None

# Modelo para Articles

# Modelo para Articles
class Article(BaseModel):
    id: Optional[int] = None
    title: str
    category: Optional[str] = None
    content: str
    author_id: int
    created_at: Optional[datetime] = None

class ArticleSlug(BaseModel):
    slug: str
    title: str