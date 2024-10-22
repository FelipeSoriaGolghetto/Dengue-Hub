import { useState } from 'react';
import Link from 'next/link';

const Sidebar = () => {
  // Estado para controlar a visibilidade da sidebar
  const [isOpen, setIsOpen] = useState(true);

  // Função para alternar a sidebar
  const toggleSidebar = () => {
    setIsOpen(prevState => !prevState);
  };

  return (
    <>
      <aside className={`sidebar ${isOpen ? 'open' : 'closed'}`}>
        <button onClick={toggleSidebar} className="toggle-button">
          {isOpen ? 'Fechar' : 'Abrir'}
        </button>
        <nav>
          <ul>
            <li><Link href="/wiki/introducao-nextjs">Introdução ao Next.js</Link></li>
            <li><Link href="/wiki/react-hooks">React Hooks</Link></li>
            <li><Link href="/wiki/javascript-basics">JavaScript Básico</Link></li>
          </ul>
        </nav>

        <style jsx>{`
          .sidebar {
            margin-top: 50px;
            width: 250px;
            background-color: #C7EAC1;
            padding: 1rem;
            color: white;
            height: 100vh; /* Para a sidebar ocupar toda a altura da tela */
            transition: transform 0.3s ease; /* Animação suave */
            transform: translateX(0); /* Sidebar visível */
            position: relative; /* Para que o botão possa ser posicionado dentro */
          }
          .sidebar.closed {
            transform: translateX(-100%); /* Sidebar oculta */
            pointer-events: none; /* Ignorar eventos quando fechada */
          }
          .toggle-button {
            background-color: #96CE8C; /* Cor do botão */
            color: black;
            border: none;
            padding: 10px;
            cursor: pointer;
            margin-right: 10px;
            margin-bottom: 1rem; /* Espaçamento abaixo do botão */
            position: relative; /* Para posicionar o botão */
            top: 10px; /* Distância do topo da sidebar */
            z-index: 1; /* Para garantir que o botão fique acima de outros elementos */
          }
          .sidebar nav ul {
            list-style: none;
            color: black;
            padding: 0;
          }
          .sidebar nav ul li {
            margin-bottom: 1rem;
            color: black;
          }
          .sidebar nav ul li a {
            color: black;
            text-decoration: none;
            font-weight: bold;
          }
          .sidebar nav ul li a:hover {
            color: black;
            text-decoration: underline;
          }
        `}</style>
      </aside>
    </>
  );
};

export default Sidebar;
