import { useState } from 'react';
import Link from 'next/link';
import '../styles/global.css';
import Image from 'next/image';
import Logo from '../public/logo-mosquito.svg';
import { getUserById } from '../services/users'; // Importando a função da API

const Drawer = () => {
  const [user, setUser] = useState(null); // Estado para armazenar o usuário

  const handleGetUser = async () => {
    try {
      console.log("passou")
      const userId = 2; // Substitua pelo ID do usuário que deseja buscar
      const fetchedUser = await getUserById(userId);
      setUser(fetchedUser);
      console.log('Usuário buscado:', fetchedUser); // Para ver o usuário no console
    } catch (error) {
      console.error('Erro ao buscar usuário:', error);
    }
  };


  return (
    <>
      <div className="drawer mt-2 ml-5">
        <input id="my-drawer" type="checkbox" className="drawer-toggle" />
        <div className="drawer-content ">

          <label htmlFor="my-drawer" className="btn btn-primary drawer-button bg-button border-none">
            <img src="/menu-icon.svg" alt="Logo" width={40} height={40} className="mr-1" />
          </label>
        </div>
        
        <div className="drawer-side">
          <label htmlFor="my-drawer" aria-label="close sidebar" className="drawer-overlay"></label>
          <ul className="menu font-bold min-h-screen w-60 p-8 bg-sidebar">
         
            {/* Sidebar content here */}
            <a className="text-xl mt-16">Guia de Conteúdos</a>
            <li><a href='/'><img src="/logo-mosquito.svg" alt="Logo" width={40} height={40} className="mr-1" /> Wiki</a></li>
            <li><a href='/login'><img src="/user-icon.svg" alt="Login" width={40} height={40} className="mr-1" /> Login</a></li>
            <li> <a onClick={handleGetUser}> {/* Modifique o botão "Estatísticas" */}<img src="/file.svg" alt="Estatísticas" width={40} height={40} className="mr-1" />Estatísticas</a></li>
            <li><a><img src="/globe.svg" alt="Globe" width={40} height={40} className="mr-1" /> Mapas</a></li>
            <li><a><img src="/window.svg" alt="Window" width={40} height={40} className="mr-1" /> Histórico</a></li>
            <li><a href='/admin'><img src="/user-check.svg" alt="Auth" width={40} height={40} className="mr-1" /> Autenticação de usuários</a></li>
            <li><a href='/landpage'><img src="/x-circle.svg" alt="Auth" width={40} height={40} className="mr-1" /> Landpage</a></li>
            <li><a href='/landing'><img src="/x-circle.svg" alt="Auth" width={40} height={40} className="mr-1" /> Landing</a></li>
         
          </ul>
        </div>
      </div>
    </>
  );
};

export default Drawer;
