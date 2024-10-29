import Image from 'next/image';
import React from 'react';
import '../styles/global.css';
import LoginForm from '../components/LoginForm';
import Navbar from '../components/navbar.js';
import Drawer from '../components/drawer.js';

export default function Home() {
  return(
    <main>
      <div className="h-screen flex justify-center items-center bg-white-300 px-5"> 
        <LoginForm />
      </div>
    </main>
  );
}