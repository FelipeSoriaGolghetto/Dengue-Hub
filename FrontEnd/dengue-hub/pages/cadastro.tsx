import Image from 'next/image';
import React from 'react';
import '../styles/global.css';
import RegisterForm from '../components/RegisterForm';
import Navbar from '../components/navbar.js';
import Drawer from '../components/drawer.js';

export default function Home() {
  return(
    <main>
      <div className="h-screen flex justify-center items-center bg-white-300 px-5"> 
        <RegisterForm />
      </div>
    </main>
  );
}