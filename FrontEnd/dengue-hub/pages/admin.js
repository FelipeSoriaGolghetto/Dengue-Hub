import React, { useState, useEffect } from 'react';
import Navbar from '../components/navbar';
import { authenticateUser, rejectUser } from '../Services/autentication';
import { useRouter } from 'next/router';


const Autenticacao = () => {
  const [solicitacoes, setSolicitacoes] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const router = useRouter();

  const verifyUserStatus = async () => {
    const userEmail = localStorage.getItem('user_email');

    if (!userEmail) {
      // Se não houver e-mail no localStorage, redireciona para login
      router.push('/todos');
      return;
    }

    try {
      // Fazendo a requisição para a API do backend
      const response = await fetch(`http://localhost:8000/users/verify/Admin/${userEmail}`);
      const data = await response.json();

      if (response.ok) {
        if (data.message === "User is authenticated") {
          console.log("Usuário autenticado, pode acessar a página");
        } else {
          console.log("Usuário não autorizado, redirecionando...");
          router.push('/todos'); // Redireciona para uma página de acesso negado
        }
      } else {
        console.error("Erro ao verificar status do usuário:", data.detail);
        router.push('/todos'); // Se não encontrar o usuário, redireciona para login
      }
    } catch (error) {
      console.error("Erro ao verificar status do usuário:", error);
      router.push('/todos'); // Se ocorrer erro na requisição, redireciona para login
    }
  };

  useEffect(() => {
    verifyUserStatus();
    const fetchSolicitacoes = async () => {
      try {
        const response = await fetch('http://localhost:8000/users/?status=Pending');
        if (response.ok) {
          const data = await response.json();
          setSolicitacoes(data); 
        } else {
          console.error('Erro ao buscar solicitações:', response.statusText);
        }
      } catch (error) {
        console.error('Erro ao buscar solicitações:', error);
      } finally {
        setIsLoading(false);
      }
    };

    fetchSolicitacoes();
  }, []);

  const handleAccept = async (id) => {
    try {
      const response = await authenticateUser(id);
      window.location.reload(); // Recarrega a página
      alert(`Cadastro validado com sucesso!`);
    } catch (error) {
      console.error('Erro:', error);
    }
  };

  const handleReject = async (id) => {
    try {
      const response = await rejectUser(id);
      alert(`Cadastro rejeitado!`);
      window.location.reload(); // Recarrega a página
    } catch (error) {
      console.error('Erro:', error);
    }
  };

  return (
    <div className='layout' style={{ backgroundColor: '#FFFFFF', minHeight: '100vh', padding: '20px' }}>
      <Navbar /> 
      <h1 style={{ fontSize: '34px', fontWeight: 'bold', marginTop: '30px', textAlign: 'center', marginBottom: '20px'}}>Autenticação de usuários</h1>
      
      <p style={{ textAlign: 'center', fontSize: '18px', marginBottom: '40px' }}>
        {isLoading ? 'Carregando...' : `Total de solicitações pendentes: ${solicitacoes.length}`}
      </p>
      
      {isLoading ? (
        <p style={{ textAlign: 'center' }}>Carregando...</p>
      ) : (
        solicitacoes.map((solicitacao) => (
          <div key={solicitacao.id_user} style={styles.card}>
            <div style={styles.infoContainer}>
              <p style={styles.text}><strong>Nome:</strong> {solicitacao.user_name}</p>
              <p style={styles.text}><strong>Profissão:</strong> {solicitacao.user_role}</p>
            </div>
            <div style={styles.buttonContainer}>
              <button 
                className="btn btn-success rounded-full hover:bg-green-700 text-white font-bold" 
                onClick={() => handleAccept(solicitacao.id_user)} 
                style={styles.acceptButton}
              >
                <img src="/check-circle.svg" alt="Check" width={30} height={30} className="mr-1" />
              </button>
              <button 
                className="btn btn-error rounded-full hover:bg-red-700 text-white font-bold" 
                onClick={() => handleReject(solicitacao.id_user)} 
                style={styles.rejectButton}
              >
                <img src="/x-circle.svg" alt="X" width={30} height={30} className="mr-1" />
              </button>
            </div>
          </div>
        ))
      )}
    </div>
  );
};

export default Autenticacao;

// Estilos mantêm-se iguais ao código inicial
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