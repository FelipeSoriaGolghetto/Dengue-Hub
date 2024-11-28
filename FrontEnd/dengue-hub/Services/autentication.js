// URL base da API
const API_URL = 'http://localhost:8000';


export const authenticateUser = async (userId) => {
    try {
        const url = `${API_URL}/users/authenticate/${userId}`;
        console.log('Chamando a API:', url); // Log da URL
        const response = await fetch(url, {
            method: 'PATCH', // Método HTTP correto
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ authenticated: true }) // Corpo da requisição
        });

        if (!response.ok) {
            throw new Error('Erro ao autenticar usuário');
        }

        return await response.json();
    } catch (error) {
        console.error('Erro ao chamar authenticateUser:', error);
        throw error;
    }
};


export const rejectUser = async (userId) => {
    try {
        const url = `${API_URL}/users/reject/${userId}`;
        console.log('Chamando a API:', url); // Log da URL
        const response = await fetch(url, {
            method: 'PATCH', // Método HTTP correto
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ authenticated: true }) // Corpo da requisição
        });

        if (!response.ok) {
            throw new Error('Erro ao autenticar usuário');
        }

        return await response.json();
    } catch (error) {
        console.error('Erro ao chamar authenticateUser:', error);
        throw error;
    }
};

