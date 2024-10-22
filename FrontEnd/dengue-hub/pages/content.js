// pages/content.js
import { useEffect, useState } from 'react';

const ContentPage = () => {
  const [content, setContent] = useState('');

  useEffect(() => {
    const fetchContent = async () => {
      const response = await fetch('../texto/texto1.txt'); // Caminho do arquivo
      const text = await response.text();
      setContent(text);
    };

    fetchContent();
  }, []);

  return (
    <div>
      <h1>Conteúdo Importado</h1>
      <p>{content}</p>
    </div>
  );
};

export default ContentPage;
