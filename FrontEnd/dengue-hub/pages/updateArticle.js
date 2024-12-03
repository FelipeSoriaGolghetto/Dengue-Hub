import React, { useState, useEffect } from "react";
import Navbar from '../components/navbar';
import QuillEditor from '../components/quillEditor';
import ArticleSearchBar from '../components/articleSearchBar';

export default function UpdateArticle() {
  const [articleId, setArticleId] = useState(null);
  const [title, setTitle] = useState('');
  const [category, setCategory] = useState('');
  const [content, setContent] = useState('');
  const [authorId, setAuthorId] = useState(null);
  const [createdAt, setCreatedAt] = useState('');
  const [message, setMessage] = useState(null);
  const [isError, setIsError] = useState(false);

  // Fetch article data when an article is selected
  const fetchArticleData = async (id) => {
    try {
      const response = await fetch(`http://localhost:8000/articles/?id=${id}`);
      const data = await response.json();
      if (data.length > 0) {
        const article = data[0];
        setArticleId(article.id);
        setTitle(article.title);
        setCategory(article.category);
        setContent(article.content);
        setAuthorId(article.author_id);
        setCreatedAt(article.created_at);
      } else {
        setMessage("Artigo não encontrado.");
        setIsError(true);
      }
    } catch (error) {
      console.error('Error fetching article data:', error);
      setMessage("Erro ao buscar dados do artigo.");
      setIsError(true);
    }
  };

  // Handle article selection from search bar
  const handleSelectArticle = (id) => {
    fetchArticleData(id);
  };

  // Handle form submission to update article
  const handleUpdateArticle = async (e) => {
    e.preventDefault();
    setMessage(null);
    setIsError(false);

    const data = {
      title,
      category,
      content,
      author_id: authorId,
      created_at: createdAt,
    };

    try {
      const response = await fetch(`http://localhost:8000/articles/${articleId}`, {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(data),
      });

      if (response.ok) {
        setMessage("Artigo atualizado com sucesso!");
        setIsError(false);
      } else {
        const errorData = await response.json();
        setMessage(`Erro ao atualizar: ${errorData.detail || JSON.stringify(errorData)}`);
        setIsError(true);
      }
    } catch (error) {
      console.error('Error updating article:', error);
      setMessage(`Erro ao atualizar o artigo: ${error.message}`);
      setIsError(true);
    }
  };

  return (
    <div>
      <div className="mt-5">
        <Navbar/>
      </div>
      <div className="max-w-5xl mx-auto p-8">
        <h1 className="text-3xl font-bold mb-4">Atualizar Artigo da Wiki</h1>
        <ArticleSearchBar onSelectArticle={handleSelectArticle} />
        <form onSubmit={handleUpdateArticle} className="mt-4">
          <QuillEditor
            title={title}
            category={category}
            content={content}
            onTitleChange={setTitle}
            onCategoryChange={setCategory}
            onContentChange={setContent}
          />
          <button type="submit" className="btn btn-primary mt-4">Atualizar Artigo</button>
        </form>
        {message && (
          <div className={`mt-4 p-2 rounded text-center ${isError ? "bg-red-500 text-white" : "bg-green-500 text-white"}`}>
            {message}
          </div>
        )}
      </div>
    </div>
  );
}