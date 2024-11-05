"use client";

import React from 'react';
import { useRouter } from 'next/router';
import { signIn } from 'next-auth/react';

export default function LoginForm() {
    const router = useRouter();

    async function login(e: React.FormEvent<HTMLFormElement>) {
        e.preventDefault();
        const formData = new FormData(e.currentTarget);

        const data = {
            email: formData.get('email'),
            password: formData.get('password'),
        };

        try {
            // Chamada ao endpoint FastAPI
            const response = await fetch(`http://127.0.0.1:8000/users`, {
                method: 'get',
                headers: {
                    'Content-Type': 'application/json'
                }
            });

            if (response.ok) {
                const result = await response.json();
                
                // Realiza o login com `next-auth` após confirmação do FastAPI
                signIn('credentials', {
                    ...data,
                    callbackUrl: '/admin',
                });
            } else {
                console.error('Login falhou:', response.statusText);
                // Adicione uma mensagem de erro aqui se desejar
            }
        } catch (error) {
            console.error('Erro ao conectar com a API:', error);
        }
    };

    return (
        <form 
        onSubmit={login}
        className="border-dashed border-2 border-black bg-white p-12 rounded-lg w-96 max-w-full flex justify-center items-center flex-col gap-2 ">
            <div className="flex items-center mb-1">
              <a className="btn btn-ghost font-bold text-2xl mb-0" href='/'>DENGUE HUB
                <img src="/logo-mosquito.svg" alt="Logo" width={40} height={40} className="mr-1" />
              </a>
            </div>         
            <div className="divider divider-accent"></div>
            <h2 className="font-bold text-xl mb-3">Bem vindo de volta!</h2>
            <h3 className="font-bold text mb-2">Você precisa fazer login para contribuir na Wiki</h3>
            <input 
                name="email"
                type="email"
                placeholder="Email" 
                className="input input-primary w-full" 
            />
            <input 
                name='password'
                type="password"
                placeholder="Senha" 
                className="input input-primary w-full" 
            />
            <button type="submit" className="btn btn-secundary w-full">Fazer login</button>
            <a className="btn btn-secundary w-full" style={{ backgroundColor: 'black', color: 'white' }} onClick={() => router.push('/cadastro')}>Cadastre-se</a>
        </form>
    );
}
