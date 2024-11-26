import { useState } from 'react';
import Link from 'next/link';
import '../styles/global.css';
import Image from 'next/image';
import Logo from '../public/logo-mosquito.svg';
import Drawer from './drawer.js';

const SearchBar = () => {


  return (
    <>
        <div className="input flex items-center gap-2 h-14 w-max">
          <img src="/menu-icon.svg" alt="drawer" width={20} className="mr-1" />  

          <input type="text" className="grow border-none w-min-64" placeholder="O que deseja saber sobre a dengue?" />
          <img src="/lupa.svg" alt="drawer" width={90} className="mr-1" />  
        </div>
    </>
  );
};

export default SearchBar;
