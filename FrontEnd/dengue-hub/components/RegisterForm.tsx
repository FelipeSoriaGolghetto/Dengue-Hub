"use client";

import Image from 'next/image';
import React from 'react';

export default function RegisterForm() {
    return(
    <form className="border-dashed border-2 border-black bg-white p-12 rounded-lg w-96 max-w-full flex justify-center items-center flex-col">
        <div className="flex items-center mb-1">
        <a className="btn btn-ghost text-2xl font-bold" href='/'>DENGUE HUB
            <img src="/logo-mosquito.svg" alt="Logo" width={40} height={40} className="mr-1" />
        </a>
        </div>         
      <div className="divider divider-accent"></div>
      <h2 className="font-bold text-xl mb-3">Bem vindo!</h2>
      <h3 className="font-bold text mb-2">Você precisa estar cadastrado para contribuir na Wiki</h3>
      <input 
        type="name"
        placeholder="Nome completo" 
        className="input input-primary w-full" 
      />
      <input 
        type="job"
        placeholder="Profissão" 
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

    <div className="flex flex-col">
      <div className="form-control w-52">
        <label className="label cursor-pointer">
          <span className="label-text">Termos e Condições</span>
          <input type="checkbox" className="toggle toggle-success"  />
        </label>
      </div>
    </div>

    <button className="btn btn-secundary w-full">Solicitar cadastro</button>
    </form>
    );
}

    