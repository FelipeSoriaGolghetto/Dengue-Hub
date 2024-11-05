import Image from 'next/image';
import React from 'react';
import '../styles/global.css';
import { useState } from 'react';
import { createUser } from '../services/users'; 

// Tipo para mensagem de feedback
type MessageType = {
  type: 'success' | 'error';
  text: string;
} | null;

export default function Home() {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    password: '',
  });

  const [message, setMessage] = useState<MessageType>(null); // Estado para mensagens de feedback

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData((prevData) => ({
      ...prevData,
      [name]: value,
    }));
  };

  const handleCadastro = async () => {
    try {
      const response = await createUser(formData);
      setMessage({ type: 'success', text: 'Cadastro realizado com sucesso!' });
      console.log('Usuário criado:', response);
    } catch (error) {
      setMessage({ type: 'error', text: 'Erro ao realizar cadastro, tente novamente.' });
      console.error('Erro ao criar usuário:', error);
    }
  };

  return (
    <div className="h-screen flex justify-center items-center bg-slate-600 px-5">
      <div className="bg-white p-12 rounded-lg w-96 max-w-full flex justify-center items-center flex-col gap-2">
        <div className="flex items-center mb-1">
          <h1 className="font-bold text-2xl mb-0">DENGUE HUB</h1>
          <Image src="/logo-mosquito.svg" alt="Logo" width={40} height={40} className="mr-1" /> 
        </div>
        <div className="divider -mt-3"></div>
        <h2 className="font-bold text-xl mb-3">Bem-vindo!</h2>
        <h3 className="font-bold text mb-2">Você precisa estar cadastrado para contribuir na Wiki</h3>
        
        <input 
          type="text"
          name="name"
          placeholder="Nome completo"
          value={formData.name}
          onChange={handleChange}
          className="input input-primary w-full" 
        />
        
        <input 
          type="email"
          name="email"
          placeholder="Email"
          value={formData.email}
          onChange={handleChange}
          className="input input-primary w-full" 
        />
        
        <input 
          type="password"
          name="password"
          placeholder="Senha"
          value={formData.password}
          onChange={handleChange}
          className="input input-primary w-full" 
        />

        <button className="btn btn-primary w-full" onClick={handleCadastro}>
          Solicitar cadastro
        </button>

        {message && (
          <div className={`mt-4 text-center ${message.type === 'success' ? 'text-green-500' : 'text-red-500'}`}>
            {message.text}
          </div>
        )}
      </div>
    </div>
  );
}