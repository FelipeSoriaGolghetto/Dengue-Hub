import Sidebar from '../components/sidebar'; // Importe a Sidebar
import Topbar from '../components/topbar';
import Link from 'next/link';
import '../styles/custom.css';

const articles = [
  { slug: 'introducao-nextjs', title: 'Introdução ao Next.js' },
  { slug: 'react-hooks', title: 'Entendendo React Hooks' },
  { slug: 'javascript-basics', title: 'Conceitos Básicos de JavaScript' },
];

const WikiHome = () => {
  return (
    <div className="layout">
      {/* Sidebar importada */}
      <Sidebar />

      {/* TopBar importada */}
      <Topbar />

      {/* Conteúdo principal */}
      <div className="content">
        <h1>Como identificar um aedes aegypti voando ?</h1>
        <p className="intro">
        Quando ele pousa, caso olhemos de perto, podemos verificar se aquele  mosquito trata-se de um mosquito da dengue ou se é apenas um pernilongo  comum, mas às vezes precisamos saber se é um mosquito da dengue antes  dele pousar, então aqui vão algumas dicas de como identificar um  mosquito da dengue enquanto tal ainda está em voo.
        </p><p>
        1-Tamanho: O inseto transmissor do vírus é normalmente bem menor que um mosquito qualquer
          
        </p>
        <p>
        2-Voo: O aedes aegypt é mais rápido que um pernilongo,  sendo assim mais difícil de matá-lo a "sandalhadas" ou tapas, porém,  enquanto voa, ele normalmente fica rodeando o local antes de pousar. Ele  também voa mais na altura da perna humana, mas pode chegar a voar até  mais que 1,50m
        </p>
      </div>

      <style jsx>{`
        .layout {
          display: flex;
          min-height: 100vh; /* Para a sidebar ocupar a altura total da tela */
        }
        .content {
          flex-grow: 1;
          padding: 2rem;
          background-color: #f9f9f9;
        }
        h1 {
          color: #333;
        }
        .intro {
          font-size: 1.2rem;
          margin-bottom: 2rem;
        }
        .article-list {
          list-style: none;
          padding: 0;
        }
        .article-list li {
          margin-bottom: 1rem;
        }
        .article-link {
          font-size: 1.5rem;
          color: #0070f3;
          text-decoration: none;
        }
        .article-link:hover {
          color: #0056b3;
        }

        /* Responsividade */
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

export default WikiHome;