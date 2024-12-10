import { useState } from 'react';



import { useSelector } from 'react-redux';
import { Link, useLocation } from 'react-router-dom';

function Navbar() {

  let location=useLocation();
    

  return (

    <div style={{
        width: '100%',
        height: '100%',
        alignItems: 'center',
        display: 'flex',
        
        }}>      
        {['inicio', 'vehiculos', 'usuarios', 'salir'].map((path, index, array) => {
        // Determina si la ruta actual coincide con el enlace
        const isActive = location.pathname === `/${path}`;
        
        
        return (
        <Link to={`/${path}`} key={index} style={{ flex: 1 }}>
          <div className={`h-[105px] py-5 ${
                isActive ? 'bg-[#0a5477]' : 'bg-[#0477AD]'
              } flex justify-center items-center box-border ${
                index !== array.length - 1 ? 'border-r border-white' : ''
              }`}
           >
            <div class="text-white text-[1.5rem] font-inter font-bold break-words">
              {path.charAt(0).toUpperCase() + path.slice(1)}
            </div>
          </div>
        </Link>
      )})}
    </div>



  );
}

export default Navbar;

