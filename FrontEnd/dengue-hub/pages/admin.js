import React, { useState, useEffect } from "react";
import Navbar from "../components/navbar";
import { authenticateUser, rejectUser } from "../Services/autentication";
import { useSession } from "next-auth/react";
import { useRouter } from "next/router";

const Autenticacao = () => {
  const [solicitacoes, setSolicitacoes] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const { data: session, status } = useSession();
  const router = useRouter();

  // Verificação de autenticação via API
  useEffect(() => {
    const verificarAutenticacao = async () => {
      if (status === "loading") return; // Aguarda o carregamento da sessão
      if (!session || !session.user.email) {
        router.push("/unauthorized"); // Redireciona caso não exista sessão
        return;
      }

      try {
        // Faz chamada ao endpoint para verificar se o usuário é autenticado
        const response = await fetch(
          `http://localhost:8000/authenticated?email=${session.user.email}`
        );

        if (!response.ok) {
          throw new Error("Usuário não autenticado");
        }

        const data = await response.json();

        if (!data.isAuthenticated) {
          router.push("/unauthorized"); // Redireciona se não for autenticado
        }
      } catch (error) {
        console.error("Erro ao verificar autenticação:", error);
        router.push("/unauthorized"); // Redireciona em caso de erro
      }
    };

    verificarAutenticacao();
  }, [session, status, router]);

  useEffect(() => {
    const fetchSolicitacoes = async () => {
      try {
        const response = await fetch(
          "http://localhost:8000/users/?status=Pending"
        );
        if (response.ok) {
          const data = await response.json();
          setSolicitacoes(data);
        } else {
          console.error("Erro ao buscar solicitações:", response.statusText);
        }
      } catch (error) {
        console.error("Erro ao buscar solicitações:", error);
      } finally {
        setIsLoading(false);
      }
    };

    fetchSolicitacoes();
  }, []);

  const handleAccept = async (id) => {
    try {
      await authenticateUser(id);
      window.location.reload(); // Recarrega a página
      alert(`Cadastro validado com sucesso!`);
    } catch (error) {
      console.error("Erro:", error);
    }
  };

  const handleReject = async (id) => {
    try {
      await rejectUser(id);
      alert(`Cadastro rejeitado!`);
      window.location.reload(); // Recarrega a página
    } catch (error) {
      console.error("Erro:", error);
    }
  };

  if (status === "loading" || !session) {
    return <p>Carregando...</p>;
  }

  return (
    <div
      className="layout"
      style={{ backgroundColor: "#FFFFFF", minHeight: "100vh", padding: "20px" }}
    >
      <Navbar />
      <h1
        style={{
          fontSize: "34px",
          fontWeight: "bold",
          marginTop: "30px",
          textAlign: "center",
          marginBottom: "20px",
        }}
      >
        Autenticação de usuários
      </h1>

      <p style={{ textAlign: "center", fontSize: "18px", marginBottom: "40px" }}>
        {isLoading
          ? "Carregando..."
          : `Total de solicitações pendentes: ${solicitacoes.length}`}
      </p>

      {isLoading ? (
        <p style={{ textAlign: "center" }}>Carregando...</p>
      ) : (
        solicitacoes.map((solicitacao) => (
          <div key={solicitacao.id_user} style={styles.card}>
            <div style={styles.infoContainer}>
              <p style={styles.text}>
                <strong>Nome:</strong> {solicitacao.user_name}
              </p>
              <p style={styles.text}>
                <strong>Profissão:</strong> {solicitacao.user_role}
              </p>
            </div>
            <div style={styles.buttonContainer}>
              <button
                className="btn btn-success rounded-full hover:bg-green-700 text-white font-bold"
                onClick={() => handleAccept(solicitacao.id_user)}
                style={styles.acceptButton}
              >
                <img
                  src="/check-circle.svg"
                  alt="Check"
                  width={30}
                  height={30}
                  className="mr-1"
                />
              </button>
              <button
                className="btn btn-error rounded-full hover:bg-red-700 text-white font-bold"
                onClick={() => handleReject(solicitacao.id_user)}
                style={styles.rejectButton}
              >
                <img
                  src="/x-circle.svg"
                  alt="X"
                  width={30}
                  height={30}
                  className="mr-1"
                />
              </button>
            </div>
          </div>
        ))
      )}
    </div>
  );
};

export default Autenticacao;

// Estilos mantêm-se iguais ao código original
const styles = {
  card: {
    display: "flex",
    justifyContent: "space-between",
    alignItems: "center",
    border: "1px solid #ddd",
    borderRadius: "8px",
    padding: "15px",
    marginBottom: "20px",
    width: "100%",
    maxWidth: "1200px",
    boxShadow: "0px 4px 8px rgba(0, 0, 0, 0.1)",
    marginLeft: "60px",
  },
  infoContainer: {
    flex: "1",
  },
  text: {
    fontSize: "16px",
    margin: "5px 0",
  },
  buttonContainer: {
    display: "flex",
    gap: "10px",
    flexWrap: "wrap",
    justifyContent: "center",
  },
  acceptButton: {
    padding: "10px 20px",
    border: "none",
    borderRadius: "20px",
    cursor: "pointer",
    fontWeight: "bold",
  },
  rejectButton: {
    padding: "10px 20px",
    border: "none",
    borderRadius: "20px",
    cursor: "pointer",
    fontWeight: "bold",
  },
};
