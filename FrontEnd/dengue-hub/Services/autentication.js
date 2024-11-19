// URL base da API
const API_URL = process.env.NEXT_PUBLIC_API_URL;


export const authenticateUser = async (userId) => {
    try {
        const url = `${API_URL}/users/${userId}/authenticate`;
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
        const url = `${API_URL}/users/${userId}/reject`;
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

