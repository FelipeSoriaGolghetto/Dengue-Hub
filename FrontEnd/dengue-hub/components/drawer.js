import { useState } from 'react';
import Link from 'next/link';
import '../styles/global.css';
import Image from 'next/image';
import Logo from '../public/logo-mosquito.svg';

const Drawer = () => {


  return (
    <>
     <div className="drawer mt-2 ml-5">
  <input id="my-drawer" type="checkbox" className="drawer-toggle" />
  <div className="drawer-content ">
    {/* Page content here */}
    <label htmlFor="my-drawer" className="btn btn-primary drawer-button bg-button">
        <img src="/menu-icon.svg" alt="Logo" width={40} height={40} className="mr-1" />
    </label>
  </div>
  <div className="drawer-side ">
    <label htmlFor="my-drawer" aria-label="close sidebar" className="drawer-overlay"></label>
    <ul className="menu font-bold min-h-full w-60 p-4 bg-sidebar">
      {/* Sidebar content here */}
      <a className="text-xl">Guia de Conteúdos</a>
      <li><a><img src="/logo-mosquito.svg" alt="Logo" width={40} height={40} className="mr-1" /> Wiki</a></li>
      <li><a><img src="/user-icon.svg" alt="Login" width={40} height={40} className="mr-1" /> Login</a></li>
      <li><a><img src="/file.svg" alt="Login" width={40} height={40} className="mr-1" /> Estatísticas</a></li>
      <li><a><img src="/globe.svg" alt="Login" width={40} height={40} className="mr-1" /> Mapas</a></li>
      <li><a><img src="/window.svg" alt="Login" width={40} height={40} className="mr-1" /> Histórico</a></li>
    </ul>
  </div>
</div>
    </>
  );
};

export default Drawer;
