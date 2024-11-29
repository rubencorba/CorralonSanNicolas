import { useState } from 'react';



import { useSelector } from 'react-redux';
import { Link, useLocation } from 'react-router-dom';

function Navbar() {

  let location=useLocation();
    

  return (

    <div style={{
        width: '100%',
        height: '100%',
        /* justifyContent: 'flex-start', */
        /* justifyContent: 'space-between', */
        /* alignItems: 'flex-start', */
        alignItems: 'center',
        display: 'flex',
        
        }}>      
        {['inicio', 'vehiculos', 'usuarios', 'salir'].map((path, index, array) => (
        <Link to={`/${path}`} key={index} style={{ flex: 1 }}>
          <div className={`h-[105px] py-5 bg-[#0477AD] flex justify-center items-center box-border
           ${index !== array.length - 1 ? 'border-r border-white' : ''}`}
           >
            <div class="text-white text-[1.5rem] font-inter font-bold break-words">
              {path.charAt(0).toUpperCase() + path.slice(1)}
            </div>
          </div>
        </Link>
      ))}
    </div>



  );
}

export default Navbar;

/* Icono salir */
{/* <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="size-6">
<path strokeLinecap="round" strokeLinejoin="round" d="M15.75 9V5.25A2.25 2.25 0 0 0 13.5 3h-6a2.25 2.25 0 0 0-2.25 2.25v13.5A2.25 2.25 0 0 0 7.5 21h6a2.25 2.25 0 0 0 2.25-2.25V15m3 0 3-3m0 0-3-3m3 3H9" />
</svg> */}