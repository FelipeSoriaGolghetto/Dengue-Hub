import { useRouter } from 'next/router';

const articles = {
  'introducao-nextjs': {
    title: 'Introdução ao Next.js',
    content: 'Next.js é um framework React para produção...'
  },
  'react-hooks': {
    title: 'Entendendo React Hooks',
    content: 'React Hooks permitem usar estado e outras funcionalidades...'
  },
  'javascript-basics': {
    title: 'Conceitos Básicos de JavaScript',
    content: 'JavaScript é uma linguagem de programação amplamente usada...'
  }
};

const WikiArticle = () => {
  const router = useRouter();
  const { slug } = router.query;
  const article = articles[slug];

  if (!article) {
    return <p>Artigo não encontrado</p>;
  }

  return (
    <div className="article-container">
      <h1>{article.title}</h1>
      <p>{article.content}</p>

      <style jsx>{`
        .article-container {
          max-width: 800px;
          margin: 0 auto;
          padding: 2rem;
          background-color: #fff;
          border-radius: 8px;
          box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1);
        }
        h1 {
          color: #333;
          font-size: 2.5rem;
          margin-bottom: 1rem;
        }
        p {
          font-size: 1.2rem;
          line-height: 1.6;
          color: #666;
        }
      `}</style>
    </div>
  );
};

export default WikiArticle;
