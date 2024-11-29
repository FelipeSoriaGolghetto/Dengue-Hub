import { useRouter } from 'next/router';
import ReactMarkdown from 'react-markdown';
import remarkGfm from 'remark-gfm';
import rehypeRaw from 'rehype-raw';
import Navbar from '../components/navbar';
import Drawer from '../components/drawer';
import '../styles/custom.css';

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
      <div className="content">
        <Navbar />
        <h1 className="titulo mt-5">{article.title}</h1>
        <ReactMarkdown
          children={article.content}
          remarkPlugins={[remarkGfm]}
          rehypePlugins={[rehypeRaw]}
          className="prose max-w-none"
        />
      </div>
    </div>
  );
};

export async function getStaticPaths() {
  // Busque os slugs disponíveis da API
  const res = await fetch('http://127.0.0.1:8000/articles');
  const articles = await res.json();

  const paths = articles.map((article) => ({
    params: { slug: article.slug },
  }));

  return { paths, fallback: true };
}

export async function getStaticProps({ params }) {
  // Busque o conteúdo do artigo da API usando o slug
  const res = await fetch(`http://127.0.0.1:8000/articles/${params.slug}`);
  const article = await res.json();

  return {
    props: {
      article,
    },
    revalidate: 10, // Revalida a página a cada 10 segundos
  };
}

export default WikiArticle;