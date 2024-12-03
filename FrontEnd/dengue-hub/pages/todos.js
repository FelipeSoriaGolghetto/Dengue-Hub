import Link from 'next/link';
import Navbar from '../components/navbar';
import '../styles/custom.css';

const Todos = ({ preventionArticles, treatmentArticles, mosquitoArticles }) => {
  return (
      
      <div className="content h-screen">
        
        <Navbar />
        <h1 className="titulo mt-10 ml-10">Lista de Artigos</h1>
        
        <div className="layout flex">
      
        <details className="collapse">
          <summary className=" ml-10 h-0 w-72 collapse-title text-2xl font-bold rounded-full bg-green-300 hover:bg-green-500 text-center">Prevenção</summary>
          <div className="collapse-content">
            <ul>
              {preventionArticles.map((preventionArticle) => (
                <li className="p-4" key={preventionArticle.slug}>
                  <Link href={`/wiki/${preventionArticle.slug}`} className="link link-hover">
                    {"● "+preventionArticle.title}
                  </Link>
                </li>
              ))}
            </ul>
          </div>
        </details>

        <details className="collapse">
          <summary className=" ml-10 h-0 w-72 collapse-title text-2xl font-bold rounded-full bg-green-300 hover:bg-green-500 text-center">Tratamento</summary>
          <div className="collapse-content">
            <ul>
              {treatmentArticles.map((treatmentArticle) => (
                <li className="p-4" key={treatmentArticle.slug}>
                  <Link href={`/wiki/${treatmentArticle.slug}`} className="link link-hover">
                    {"● "+treatmentArticle.title}
                  </Link>
                </li>
              ))}
            </ul>
          </div>
        </details>

        <details className="collapse">
          <summary className=" ml-10 h-0 w-72 collapse-title text-2xl font-bold rounded-full bg-green-300 hover:bg-green-500 text-center">Sobre o Mosquito</summary>
          <div className="collapse-content">
            <ul>
              {mosquitoArticles.map((mosquitoArticle) => (
                <li className="p-4" key={mosquitoArticle.slug}>
                  <Link href={`/wiki/${mosquitoArticle.slug}`} className="link link-hover">
                    {"● "+mosquitoArticle.title}
                  </Link>
                </li>
              ))}
            </ul>
          </div>
        </details>

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
    const preventionRes = await fetch('http://127.0.0.1:8000/articles/slugs?category=prevencao'); // Endpoint que retorna slugs e títulos
    const preventionArticles = await preventionRes.json();

    
    const treatmentRes = await fetch('http://127.0.0.1:8000/articles/slugs?category=tratamento'); // Endpoint que retorna slugs e títulos
    const treatmentArticles = await treatmentRes.json();

    
    const mosquitoRes = await fetch('http://127.0.0.1:8000/articles/slugs?category=mosquito'); // Endpoint que retorna slugs e títulos
    const mosquitoArticles = await mosquitoRes.json();
    
    // Verifica se a resposta é válida
    if (!Array.isArray(preventionArticles) || !Array.isArray(treatmentArticles) || !Array.isArray(mosquitoArticles)) {
      throw new Error('Resposta inválida da API');
    }

    return {
      props: {
        preventionArticles,
        treatmentArticles,
        mosquitoArticles,
      },
      revalidate: 10, // Revalida a cada 10 segundos
    };
  } catch (error) {
    console.error('Erro ao buscar os artigos:', error.message);

    // Retorna um array vazio caso a API falhe
    return {
      props: {
        preventionArticles: [],
        treatmentArticles: [],
        mosquitoArticles: [],
      },
    };
  }
}

export default Todos;