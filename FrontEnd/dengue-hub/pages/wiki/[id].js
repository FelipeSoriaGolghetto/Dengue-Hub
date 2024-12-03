import { useRouter } from 'next/router';
import ReactMarkdown from 'react-markdown';
import remarkGfm from 'remark-gfm';
import rehypeRaw from 'rehype-raw';
import Navbar from '../../components/navbar';
import '../../styles/custom.css';

const WikiArticle = ({ article }) => {
  const router = useRouter();

  if (router.isFallback) {
    return <div>Loading...</div>;
  }

  if (!article) {
    return <p>Artigo não encontrado</p>;
  }

  return (
    <div className="layout flex p-8">
      <div className="content ml-10">
        <Navbar />
        <h1 className="titulo mt-5">{article.title}</h1>
        <ReactMarkdown
          children={article.content}
          remarkPlugins={[remarkGfm]}
          rehypePlugins={[rehypeRaw]}
          className="prose max-w-none"
        />
      </div>
      <style jsx>{`
        .titulo {
          font-size: 2.2rem;
          font-weight: bold;
          margin-bottom: 2rem;
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

// Gera os caminhos estáticos para cada artigo
export async function getStaticPaths() {
  try {
    const res = await fetch('http://127.0.0.1:8000/articles/slugs'); // Fetch da API
    const ids = await res.json();

    // Verifica se ids é um array
    if (!Array.isArray(ids)) {
      throw new Error('A resposta da API não é um array');
    }

    // Mapeia os ids para gerar paths
    const paths = ids.map((article) => ({
      params: { id: article.slug.toString() },
    }));

    return {
      paths,
      fallback: true, // Permite fallback para páginas dinâmicas
    };
  } catch (error) {
    console.error('Erro ao buscar os ids:', error.message);

    // Retorna um paths vazio em caso de erro
    return {
      paths: [],
      fallback: true,
    };
  }
}

// Busca os dados do artigo para gerar a página estática
export async function getStaticProps({ params }) {
  try {
    const res = await fetch(`http://127.0.0.1:8000/articles/?id=${params.id}`); // Fetch da API
    const articles = await res.json();

    // Verifica se a resposta é uma lista e se contém pelo menos um artigo
    if (!Array.isArray(articles) || articles.length === 0) {
      throw new Error('Artigo não encontrado');
    }

    const article = articles[0]; // Pega o primeiro artigo da lista

    return {
      props: {
        article,
      },
      revalidate: 10, // Revalida a cada 10 segundos
    };
  } catch (error) {
    console.error('Erro ao buscar o artigo:', error.message);

    // Retorna um artigo vazio em caso de erro
    return {
      props: {
        article: null,
      },
    };
  }
}

export default WikiArticle;