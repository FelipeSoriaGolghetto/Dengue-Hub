import { useState } from 'react';
import Link from 'next/link';
import '../styles/global.css';
import Image from 'next/image';
import Logo from '../public/logo-mosquito.svg';

const Navbar = () => {


  return (
    <>
    <div className="navbar bg-button rounded-full relative">
  <div className="flex-1">
    <a className="btn btn-ghost text-2xl font-bold ml-20" href=''>DENGUE HUB
    <img src="/logo-mosquito.svg" alt="Logo" width={40} height={40} className="mr-1" />
    </a>
  </div>
  <div className="flex-none gap-2">
    <div className="form-control">
      <input type="text" placeholder="Search" className="input input-bordered w-24 md:w-auto bg-sidebar font-bold" />
    </div>
    <div className="dropdown dropdown-end">
      <div tabIndex={0} role="button" className="btn btn-ghost btn-circle avatar">
        <div className="w-10 rounded-full">
        <img src="/user-icon-small.svg" alt="Logo" width={0} height={0} className="mr-1" />
        </div>
      </div>
      <ul
        tabIndex={0}
        className="menu menu-sm dropdown-content bg-sidebar rounded-box z-[1] mt-3 w-52 p-2 shadow">
        <li>
          <a className="justify-between">
            Profile
            <span className="badge">New</span>
          </a>
        </li>
        <li><a>Settings</a></li>
        <li><a>Logout</a></li>
      </ul>
    </div>
  </div>
</div>
</>
  );
};

export default Navbar;
