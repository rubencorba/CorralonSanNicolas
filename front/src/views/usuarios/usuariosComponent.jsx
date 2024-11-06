import { useState } from 'react';



import { useSelector } from 'react-redux';
import { Link, useLocation } from 'react-router-dom';
import Navbar from '../../components/navbar/navbarComponent';

function UsuariosComponent() {

  
    

  return (

  <div className="bg-gray-100 min-h-screen">
    <Navbar/>
    

    

    <ul class="
        flex flex-col  space-y-1 my-4  
        items-center justify-center text-gray-900 justify-between 
         rounded-lg p-4">

    <div className=" flex items-center justify-center bg-gray-100">
    <div className="bg-white p-8 rounded-lg shadow-lg  w-80 my-1 mx-6">
    <li className="flex flex-col md:flex-row items-center justify-center">
        <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="size-6">
            <path strokeLinecap="round" strokeLinejoin="round" d="M8.25 9V5.25A2.25 2.25 0 0 1 10.5 3h6a2.25 2.25 0 0 1 2.25 2.25v13.5A2.25 2.25 0 0 1 16.5 21h-6a2.25 2.25 0 0 1-2.25-2.25V15M12 9l3 3m0 0-3 3m3-3H2.25" />
        </svg>



        <a href="#" class=" hover:underline">Nuevo Usuario</a>
    </li>
    </div>
    </div>


    <div className=" flex items-center justify-center bg-gray-100">
    <div className="bg-white p-8 rounded-lg shadow-lg  w-80 my-1 mx-6">
    <li className="flex flex-col md:flex-row items-center justify-center">
        <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="size-6">
            <path strokeLinecap="round" strokeLinejoin="round" d="M2.036 12.322a1.012 1.012 0 0 1 0-.639C3.423 7.51 7.36 4.5 12 4.5c4.638 0 8.573 3.007 9.963 7.178.07.207.07.431 0 .639C20.577 16.49 16.64 19.5 12 19.5c-4.638 0-8.573-3.007-9.963-7.178Z" />
            <path strokeLinecap="round" strokeLinejoin="round" d="M15 12a3 3 0 1 1-6 0 3 3 0 0 1 6 0Z" />
        </svg>



        <a href="#" class="hover:underline ">Resetear usuario</a>
    </li>
    </div>
    </div>


    
    </ul>
    </div>
    


  );
}

export default UsuariosComponent;

