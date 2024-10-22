import Image from 'next/image';
import React from 'react';
import '../styles/global.css';

export default function Home() {
  return(
    <main>
      <div className="h-screen flex justify-center items-center bg-slate-600 px-5">
        <div className="bg-white p-12 rounded-lg w-96 max-w-full flex justify-center items-center flex-col gap-2">
        <div className="flex items-center mb-1">
          <h1 className="font-bold text-2xl mb-0">DENGUE HUB</h1>
          <Image src="/logo-mosquito.svg" alt="Logo" width={40} height={40} className="mr-1" /> 
          </div>         
          <div className="divider -mt-3"></div>
          <h2 className="font-bold text-xl mb-3">Bem vindo!</h2>
          <h3 className="font-bold text mb-2">Você precisa estar cadastrado para contribuir na Wiki</h3>
          <input 
            type="name"
            placeholder="Nome completo" 
            className="input input-primary w-full" 
          />
          <input 
            type="email"
            placeholder="Email" 
            className="input input-primary w-full" 
          />
          <input 
            type="password"
            placeholder="Senha" 
            className="input input-primary w-full" 
          />
          <button className="btn btn-primary w-full">Solicitar cadastro</button>
        </div>
      </div>
    </main>
  );
}