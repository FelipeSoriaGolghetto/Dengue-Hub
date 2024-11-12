"use client";

import Image from 'next/image';
import React from 'react';

export default function RegisterForm() {
    async function register(e: React.FormEvent<HTMLFormElement>) {
        e.preventDefault();
        const formData = new FormData(e.currentTarget);

        const data = {
            name: formData.get('name'),
            job: formData.get('job'),
            email: formData.get('email'),
            password: formData.get('password'),
        };

        console.log(data);

        const response = await fetch('/api/register', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(data),
        });

        if (response.ok) {
            // Handle successful registration (e.g., redirect to login page)
            console.log('User registered successfully');
        } else {
            // Handle registration error
            console.error('Failed to register user');
        }
    };

    return (
        <form 
            onSubmit={register}
            className="border-dashed border-2 border-black bg-white p-12 rounded-lg w-96 max-w-full flex justify-center items-center flex-col"
        >
            <div className="flex items-center mb-1">
                <a className="btn btn-ghost text-2xl font-bold" href='/'>DENGUE HUB
                    <img src="/logo-mosquito.svg" alt="Logo" width={40} height={40} className="mr-1" />
                </a>
            </div>         
            <div className="divider divider-accent"></div>
            <h2 className="font-bold text-xl mb-3">Bem vindo!</h2>
            <h3 className="font-bold text mb-2">Você precisa estar cadastrado para contribuir na Wiki</h3>
            <input 
                type="text"
                name="name"
                placeholder="Nome completo" 
                className="input input-primary w-full" 
            />
            <input 
                type="text"
                name="job"
                placeholder="Profissão" 
                className="input input-primary w-full" 
            />
            <input 
                type="email"
                name="email"
                placeholder="Email" 
                className="input input-primary w-full" 
            />
            <input 
                type="password"
                name="password"
                placeholder="Senha" 
                className="input input-primary w-full" 
            />
            <button className="btn btn-secundary w-full">Cadastrar</button>
        </form>
    );
}