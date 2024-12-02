import Link from 'next/link';
import Navbar from '../components/navbar';
import '../styles/custom.css';

const Todos = ({ articles }) => {
  return (
    <div className="layout flex p-8">
      <div className="content">
        <Navbar />
        <h1 className="titulo mt-5">Lista de Artigos</h1>
        <ul>
          {articles.map((article) => (
            <li key={article.slug}>
              <Link href={`/wiki/${article.slug}`} className="article-link">
                {article.title}
              </Link>
            </li>
          ))}
        </ul>
      </div>
      <style jsx>{`
        .titulo {
          font-size: 2.2rem;
          font-weight: bold;
          margin-bottom: 2rem;
        }
        .article-link {
          color: #0070f3;
          text-decoration: none;
        }
        .article-link:hover {
          color: #0056b3;
        }
        .content {
          width: 100%;
        }
        @media (max-width: 768px) {
          .layout {
            flex-direction: column;
          }
          .content {
            width: 100%;
          }
        }
      `}</style>
    </div>
  );
};

// Busca os artigos do backend para gerar a lista
export async function getStaticProps() {
  try {
    const res = await fetch('http://127.0.0.1:8000/articles/slugs'); // Endpoint que retorna slugs e títulos
    const articles = await res.json();

    // Verifica se a resposta é válida
    if (!Array.isArray(articles)) {
      throw new Error('Resposta inválida da API');
    }

    return {
      props: {
        articles,
      },
      revalidate: 10, // Revalida a cada 10 segundos
    };
  } catch (error) {
    console.error('Erro ao buscar os artigos:', error.message);

    // Retorna um array vazio caso a API falhe
    return {
      props: {
        articles: [],
      },
    };
  }
}

export default Todos;