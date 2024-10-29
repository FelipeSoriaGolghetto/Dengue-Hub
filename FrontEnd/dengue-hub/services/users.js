// services/users.js

// URL base da API
const API_URL = process.env.NEXT_PUBLIC_API_URL;

// Função para buscar um usuário pelo ID
export const getUserById = async (userId) => {
    try {
        const url = `${API_URL}/users/${userId}`;
        console.log('Chamando a API:', url); // Log da URL
        const response = await fetch(url);
        if (!response.ok) {
          throw new Error("Erro ao buscar usuário");
        }
        return await response.json();
      } catch (error) {
        console.error(error);
        throw error;
      }
    };

// Função para criar um novo usuário
export const createUser = async (userData) => {
  try {
    const response = await fetch(`${API_URL}/users/`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(userData),
    });
    if (!response.ok) {
      throw new Error("Erro ao criar usuário");
    }
    return await response.json();
  } catch (error) {
    console.error(error);
    throw error;
  }
};

// Outras funções de usuário (update, delete) podem ser adicionadas aqui
