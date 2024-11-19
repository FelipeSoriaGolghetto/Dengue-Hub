import React from 'react';
import Navbar from '../components/navbar';
import Drawer from '../components/drawer';
import { useState } from 'react';
import { authenticateUser, rejectUser } from '../services/autentication';


const Autenticacao = () => {
  const solicitacoes = [
    { id: 1, nome: 'Alice Santos', profissao: 'Professora de Biologia' },
    { id: 2, nome: 'Carlos Oliveira', profissao: 'Estudante de Biomedicina' },
  ];

  const handleAccept = async (id) => {
    try {
      const response = await authenticateUser(id);
      if (response.ok) {
        alert(`Solicitação de ID ${id} foi aceita.`);
      } else {
        alert('Erro ao autenticar usuário.');
      }
    } catch (error) {
      console.error('Erro:', error);
    }
  };

  const handleReject = async (id) => {
    try {
      const response = await rejectUser(id);
      if (response.ok) {
        alert(`Solicitação de ID ${id} foi rejeitada.`);
      } else {
        alert('Erro ao rejeitar usuário.');
      }
    } catch (error) {
      console.error('Erro:', error);
    }
  };

  return (
    <div className='layout' style={{ backgroundColor: '#FFFFFF', minHeight: '100vh', padding: '20px' }}>
      <Navbar /> 
      <h1 style={{ fontSize: '34px', fontWeight: 'bold', marginTop: '30px', textAlign: 'center', marginBottom: '60px'}}>Autenticação de usuários</h1>
      {solicitacoes.map((solicitacao) => (
        <div key={solicitacao.id} style={styles.card}>
          <div style={styles.infoContainer}>
            <p style={styles.text}><strong>Nome:</strong> {solicitacao.nome}</p>
            <p style={styles.text}><strong>Profissão:</strong> {solicitacao.profissao}</p>
          </div>
          <div style={styles.buttonContainer}>
          <button 
               className="btn btn-success rounded-full hover:bg-green-700 text-white font-bold" 
               onClick={() => handleAccept(solicitacao.id)} 
               style={styles.acceptButton}
          >
                <img src="/check-circle.svg" alt="Check" width={30} height={30} className="mr-1" />
            </button>
            <button className="btn btn-error rounded-full hover:bg-red-700 text-white font-bold" onClick={() => handleReject(solicitacao.id)} style={styles.rejectButton}>
                <img src="/x-circle.svg" alt="X" width={30} height={30} className="mr-1" />
            </button>
          </div>
        </div>
      ))}
    </div>
  );
};

export default Autenticacao;


const styles = {

  card: {
    display: 'flex',
    justifyContent: 'space-between',
    alignItems: 'center',
    border: '1px solid #ddd',
    borderRadius: '8px',
    padding: '15px',
    marginBottom: '20px',
    width: '100%',
    maxWidth: '1200px',
    boxShadow: '0px 4px 8px rgba(0, 0, 0, 0.1)',
    marginLeft: '60px',
  },
  infoContainer: {
    flex: '1',
  },
  text: {
    fontSize: '16px',
    margin: '5px 0',
  },
  buttonContainer: {
    display: 'flex',
    gap: '10px',
    flexWrap: 'wrap', 
    justifyContent: 'center', 
  },
  acceptButton: {
    padding: '10px 20px',
    border: 'none',
    borderRadius: '20px',
    cursor: 'pointer',
    fontWeight: 'bold',
  },
  rejectButton: {
    padding: '10px 20px',
    border: 'none',
    borderRadius: '20px',
    cursor: 'pointer',
    fontWeight: 'bold',
  },
};

