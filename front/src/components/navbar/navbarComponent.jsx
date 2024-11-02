import { useState } from 'react';



import { useSelector } from 'react-redux';
import { Link, useLocation } from 'react-router-dom';

function Navbar() {

  let location=useLocation();
    

  return (

  <nav className="bg-gradient-to-r from-blue-300 to-blue-600 h-20 flex justify-around items-center">
      <Link
       to="/" 
       className={`
        flex-1 
        h-full 
        flex 
        items-center 
        justify-center 
        text-black 
        font-bold 
        text-center 
        hover:bg-blue-700 transition-colors duration-200
        ${
            location.pathname === "/home" ? "underline" : ""
          }`}>
        <div className="flex items-center justify-center h-full">
          <span>Inicio</span>
        </div>
      </Link>
      <Link to="/vehiculos" className={`flex-1 h-full flex items-center justify-center text-black font-bold text-center border-l border-black hover:bg-blue-700 transition-colors duration-200
      ${
            location.pathname === "/vehiculos" ? "underline" : ""
          }`}>
        <div className="flex items-center justify-center h-full">
          <span>Vehículos</span>
        </div>
      </Link>
      <Link to="/usuarios" className={`flex-1 h-full flex items-center justify-center text-black font-bold text-center border-l border-black hover:bg-blue-700 transition-colors duration-200
      ${
            location.pathname === "/vehiculos" ? "underline" : ""
          }`}>
        <div className="flex items-center justify-center h-full">
          <span>Usuarios</span>
        </div>
      </Link>
      <Link to="/salir" className={`flex-1 h-full flex items-center justify-center text-black font-bold text-center border-l border-black hover:bg-blue-700 transition-colors duration-200
      ${
            location.pathname === "/vehiculos" ? "underline" : ""
          }`}>
        <div className="flex items-center justify-center h-full">
          <span>Salir</span>
        </div>
      </Link>
    </nav>



  );
}

export default Navbar;

/* Icono salir */
{/* <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="size-6">
<path strokeLinecap="round" strokeLinejoin="round" d="M15.75 9V5.25A2.25 2.25 0 0 0 13.5 3h-6a2.25 2.25 0 0 0-2.25 2.25v13.5A2.25 2.25 0 0 0 7.5 21h6a2.25 2.25 0 0 0 2.25-2.25V15m3 0 3-3m0 0-3-3m3 3H9" />
</svg> */}