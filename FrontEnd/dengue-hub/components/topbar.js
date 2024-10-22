// components/TopBar.js
import { useState } from 'react';

const TopBar = ({ isOpen, toggleSidebar }) => {
  return (
    <div className="top-bar">
      <h1>Meu Wiki</h1>
      <button onClick={toggleSidebar} className="toggle-button">
        {isOpen ? 'Fechar Sidebar' : 'TopBar'}
      </button>

      <style jsx>{`
        /* Estilo da top bar */
        .top-bar {
          position: fixed; /* Fixa no topo */
          top: 0;
          left: 0;
          right: 0; /* Estende-se até a direita */
          background-color: #C7EAC1; /* Cor de fundo da top bar */
          color: white;
          display: flex;
          justify-content: space-between; /* Espaçamento entre título e botão */
          align-items: center; /* Centraliza verticalmente */
          padding: 0px 20px; /* Espaçamento interno */
          z-index: 3; /* Acima da sidebar */
          position: absolute;
        }
        /* Estilo do botão */
        .toggle-button {
          background-color: #96CE8C; /* Cor do botão */
          color: Black;
          border: none;
          padding: 10px;
          cursor: pointer;
        }
      `}</style>
    </div>
  );
};

export default TopBar;
