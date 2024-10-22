import { useState } from 'react';
import Link from 'next/link';
import '../styles/global.css'

const Drawer = () => {
    return (
      <>

      <div style={{flexDirection:'column'}}>
        <div>
          <div className="drawer-content" >
    {/* Page content here */}
    <label htmlFor="my-drawer" 
            className="btn btn-primary drawer-button 
                        bg-sidebar hover:bg-button border-none text-black">Open drawer</label>
  </div>
        </div>
        <div className="drawer-side" style={{position:"absolute"}}>
    <label htmlFor="my-drawer" aria-label="close sidebar" className="drawer-overlay"></label>
    <ul className="menu">
      {/* Sidebar content here */}
      <li><a>Sidebar Item 1</a></li>
      <li><a>Sidebar Item 2</a></li>
    </ul>
  </div>
      </div>
        <div className="drawer">
  <input id="my-drawer" type="checkbox" className="drawer-toggle" />
  
  
</div>
    </>
  );
};

export default Drawer;