import Drawer from '../components/drawer';
import Navbar from '../components/navbar';
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
      
      <div className="content">
      
      <Navbar /> 
      <Drawer /> 
      
      <h4 className="titulo mt-5">Como identificar um aedes aegypti voando ?</h4>
          <div className="wiki-metadata">
            <h2 className="font-bold">Aedes aegypti</h2>
            <img src="https://static.nationalgeographicbrasil.com/files/styles/image_3200/public/fiocruz-imagensraquel-portugalerodrigo-mexas-2.jpg?w=1600&h=900" class="wiki-pic" />
            <table className="wiki-table">
            </table>
          </div>

        <p className="intro">
          Quando ele pousa, caso olhemos de perto, podemos verificar se aquele  mosquito trata-se de um mosquito da dengue ou se é apenas um pernilongo  comum, mas às vezes precisamos saber se é um mosquito da dengue antes  dele pousar, então aqui vão algumas dicas de como identificar um  mosquito da dengue enquanto tal ainda está em voo.
        </p>
        <p className="lista">
          1-Tamanho: O inseto transmissor do vírus é normalmente bem menor que um mosquito qualquer 
        </p>
        <p className="lista">
          2-Voo: O aedes aegypt é mais rápido que um pernilongo,  sendo assim mais difícil de matá-lo a "sandalhadas" ou tapas, porém,  enquanto voa, ele normalmente fica rodeando o local antes de pousar. Ele  também voa mais na altura da perna humana, mas pode chegar a voar até  mais que 1,50m
        </p>
        <div className="wiki-metadata float-left mt-10 mr-10">
            <h2 className="font-bold">Prefeitura Municipal de Pereiras</h2>
            <img src="https://www.pereiras.sp.gov.br/public/admin/globalarq/uploads/files/338386918_600517725466525_5865963220632897994_n.jpg" class="wiki-pic" />
            <table className="wiki-table">
            </table>
          </div>
        <p className="lista">
        Então se você ver um mosquito pequeno, ágil, que está rodeando o  local e voa baixo, dedetize o local  e cheque lugares que armazenam  água.
Lembrando que nem todo aedes aegypt ou aedes albopictus (mosquito  tigre asiático, também transmissor do vírus) está contaminado com o  vírus. O vírus não é originado do próprio mosquito e ele ganha o vírus  apenas quando pica uma pessoa infectada, e quando ele pica outra depois  ele passa pra ela também.
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
        .titulo {
          font-size: 2.2rem;
          font-weight: bold;
          margin-bottom: 2rem;
        }
        .lista {
          margin-top: 2rem;
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