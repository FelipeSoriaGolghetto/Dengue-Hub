import { useState } from 'react';
import Link from 'next/link';
import '../styles/global.css';
import Image from 'next/image';
import Logo from '../public/logo-mosquito.svg';

const Footer = () => {
  

  return (
    <>
     <footer className="footer bg-gradient-to-t from-green-20 to-blank text-neutral-content p-10">
 
  <a href='/' className="link link-hover ">
    <div className="grid grid-flow-col gap-4">
      <img src="/alert.svg" alt="Logo" width={80} className="mr-1" />
      <div className="grid grid-flow-row gap-4">
        <h6 className="font-bold">PREVENÇÃO</h6>
        <a1> Conheça as maneiras corretas para se proteger da dengue</a1>
        <a1> Saiba mais</a1>
        </div>
    </div>
  </a>

  <a href='/' className="link link-hover ">
    <div className="grid grid-flow-col gap-4">
      <img src="/hospital.svg" alt="Logo" width={60} className="mr-1" />
      <div className="grid grid-flow-row gap-4">
        <h6 className="font-bold">TRATAMENTO</h6>
        <a1> Entenda como tratar corretamente caso esteja infectado</a1>
        <a1> Saiba mais</a1>
      </div>
    </div>
  </a>

  <a href='/wiki' className="link link-hover ">
    <div className="grid grid-flow-col gap-4">
      <img src="/mosquito.svg" alt="Logo" width={75} className="mr-1" />
      <div className="grid grid-flow-row gap-4">
        <h6 className="font-bold">AEDES AEGYPTI</h6>
        <a1> Descubra fatos importantes e curiosidades sobre o mosquito!</a1>
        <a1> Saiba mais</a1>
      </div>
    </div>
  </a>

  <a href='/' className="link link-hover ">
    <div className="grid grid-flow-col gap-4">
      <img src="/statistics.svg" alt="Logo" width={90} className="mr-1" />
      <div className="grid grid-flow-row gap-4">
        <h6 className="font-bold">ESTATÍSTICAS</h6>
        <a1> Veja dados atualizados sobre casos de dengue no Brasil</a1>
        <a1> Saiba mais</a1>
      </div>
    </div>
  </a>
  
</footer>
    </>
  );
};

export default Footer;
