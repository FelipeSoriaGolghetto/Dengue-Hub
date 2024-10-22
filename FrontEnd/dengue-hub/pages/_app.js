import '../styles/custom.css';
import { Roboto } from 'next/font/google';

// Importando a fonte Roboto
const roboto = Roboto({
  weight: ['400', '700'], // Pesos da fonte
  subsets: ['latin'],      // Subconjuntos da fonte
});

function MyApp({ Component, pageProps }) {
  return (
    <main className={roboto.className}>
      <Component {...pageProps} />
    </main>
  );
}

export default MyApp;
