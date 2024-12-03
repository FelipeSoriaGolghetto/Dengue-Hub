import React, { useState, useEffect } from "react";
import Navbar from '../components/navbar';
import QuillEditor from '../components/quillEditor';

export default function CreateArticle() {
  const [title, setTitle] = useState('');
  const [category, setCategory] = useState('');
  const [content, setContent] = useState('');
  const [previewContent, setPreviewContent] = useState('');
  const [isSaving, setIsSaving] = useState(false);
  const [message, setMessage] = useState(null);

  useEffect(() => {
    const timeoutId = setTimeout(() => {
      setPreviewContent(content);
    }, 300);
    
    return () => clearTimeout(timeoutId);
  }, [content]);

  // Função para salvar o artigo
  const handleSaveArticle = async () => {
    setIsSaving(true);
    setMessage(null);

    const data = {
      title,
      category,
      content,
      author_id: 7, // Adicione um valor padrão para author_id
      created_at: new Date().toISOString(), // Adicione a data atual como created_at
    };

    try {
      const response = await fetch('http://localhost:8000/articles/', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(data),
      });

      if (response.ok) {
        setMessage("Artigo salvo com sucesso!");
      } else {
        const errorData = await response.json();
        setMessage(`Erro ao salvar: ${errorData.detail || JSON.stringify(errorData)}`);
      }
    } catch (error) {
      console.error('Error saving article:', error);
      setMessage("Erro ao salvar o artigo.");
    } finally {
      setIsSaving(false);
    }
  };

  return (
    <div>
      <div className="mt-5">
        <Navbar/>
      </div>
      <div className="max-w-5xl mx-auto p-8">
        <h1 className="text-3xl font-bold mb-4">Crie uma nova página da Wiki</h1>
        <div className="w-2xl mx-auto p-8">
          <QuillEditor
            title={title}
            category={category}
            content={content}
            onTitleChange={setTitle}
            onCategoryChange={setCategory}
            onContentChange={setContent}
          />
          <button
            onClick={handleSaveArticle}
            disabled={isSaving}
            className="bg-green-600 hover:bg-green-700 text-white font-medium px-6 py-2 rounded mt-4"
          >
            {isSaving ? 'Salvando...' : 'Salvar Artigo'}
          </button>
          {message && (
            <div className={`mt-4 p-2 rounded text-center ${message.includes("Erro") ? "bg-red-500 text-white" : "bg-green-500 text-white"}`}>
              {message}
            </div>
          )}
        </div>
      </div>
    </div>
  );
}