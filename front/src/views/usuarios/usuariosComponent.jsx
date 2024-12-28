import { useState } from "react";

import { useSelector } from "react-redux";
import { Link, useLocation } from "react-router-dom";
import Navbar from "../../components/navbar/navbarComponent";

function UsuariosComponent() {
  return (
    <div>
      <Navbar />
      <div className="flex min-h-screen flex-col  items-center bg-[#F5FAFF] ">
        <div className="text-[#3d4245] text-[28px] font-bold font-inter sm:my-[3rem] my-[1rem]">
          Usuarios
        </div>

        <div className="sm:w-[40rem]  flex-col justify-start items-start gap-3 inline-flex sm:mx-[1rem] mb-[4rem]">
          <Link
            to="/nuevo_usuario"
            className="self-stretch px-4 py-7 bg-white rounded-lg border border-[#c5dfff] justify-start items-center gap-2.5 inline-flex"
          >
            <div className="w-[49px] h-[49px] relative">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 24 24"
                strokeWidth={1.5}
                stroke="currentColor"
                className="size-18 stroke-[#0477ad]"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  d="M8.25 9V5.25A2.25 2.25 0 0 1 10.5 3h6a2.25 2.25 0 0 1 2.25 2.25v13.5A2.25 2.25 0 0 1 16.5 21h-6a2.25 2.25 0 0 1-2.25-2.25V15M12 9l3 3m0 0-3 3m3-3H2.25"
                />
              </svg>
            </div>
            <div className="flex-col justify-start items-start gap-1 inline-flex">
              <div className="text-[#0477ad] text-lg font-bold font-inter">
                Nuevo usuario
              </div>
              <div className="text-[#687073] text-sm font-normal font-inter">
                Registrar un nuevo usuario
              </div>
            </div>
          </Link>

          <div className="self-stretch rounded-lg border border-[#c5dfff] flex-col flex overflow-hidden">
            <div className="self-stretch items-center bg-[#c5dfff] flex sm:gap-[1rem] lg:gap-[3rem] gap-[1.2rem] h-[3.5rem] ">
              <div className="text-start text-[#0a5477] text-xs font-bold font-inter uppercase sm:ml-[1rem] ml-[0.3rem] sm:w-[9rem] w-[5rem]">
                Nombre y apellido
              </div>
              <div className="text-center text-[#0a5477] text-xs font-bold font-inter uppercase">
                Tipo
              </div>
              <div className="text-center text-[#0a5477] text-xs font-bold font-inter uppercase">
                Registro
              </div>
            </div>
            <div className="h-20 relative bg-white border-b border-[#c5dfff] overflow-hidden flex sm:gap-[1rem] lg:gap-[3rem] gap-[1.2rem] items-center">
              <div className="text-[#3d4245] text-base font-semibold font-inter sm:ml-[1rem] ml-[0.3rem] sm:w-[9rem] w-[5rem]">
                Omar Chauderon
              </div>
              <div className="text-[#3d4245] text-center font-semibold font-inter w-[1.5rem]">
                1
              </div>
              <div className="text-[#3d4245] text-base font-semibold font-inter sm:w-[12rem] w-[6rem]">
                2019-07-15T 17:14:52.739Z
              </div>
              <div className=" px-[18px] py-2 bg-white rounded-lg border border-[#0477ad] justify-center items-center gap-1 inline-flex overflow-hidden sm:mr-[1rem] mr-[0.3rem]">
                <div className="text-[#0477ad] text-sm font-medium font-inter">
                  Resetear
                </div>
              </div>
            </div>
            <div className="h-20 relative bg-white border-b border-[#c5dfff] overflow-hidden flex sm:gap-[1rem] lg:gap-[3rem] gap-[1.2rem] items-center">
              <div className="text-[#3d4245] text-base font-semibold font-inter sm:ml-[1rem] ml-[0.3rem] sm:w-[9rem] w-[5rem]">
                Omar Chauderon
              </div>
              <div className="text-[#3d4245] text-center font-semibold font-inter w-[1.5rem]">
                1
              </div>
              <div className="text-[#3d4245] text-base font-semibold font-inter sm:w-[12rem] w-[6rem]">
                2019-07-15T 17:14:52.739Z
              </div>
              <div className=" px-[18px] py-2 bg-white rounded-lg border border-[#0477ad] justify-center items-center gap-1 inline-flex overflow-hidden sm:mr-[1rem] mr-[0.3rem]">
                <div className="text-[#0477ad] text-sm font-medium font-inter">
                  Resetear
                </div>
              </div>
            </div>
            <div className="h-20 relative bg-white border-b border-[#c5dfff] overflow-hidden flex sm:gap-[1rem] lg:gap-[3rem] gap-[1.2rem] items-center">
              <div className="text-[#3d4245] text-base font-semibold font-inter sm:ml-[1rem] ml-[0.3rem] sm:w-[9rem] w-[5rem]">
                Omar Chauderon
              </div>
              <div className="text-[#3d4245] text-center font-semibold font-inter w-[1.5rem]">
                1
              </div>
              <div className="text-[#3d4245] text-base font-semibold font-inter sm:w-[12rem] w-[6rem]">
                2019-07-15T 17:14:52.739Z
              </div>
              <div className=" px-[18px] py-2 bg-white rounded-lg border border-[#0477ad] justify-center items-center gap-1 inline-flex overflow-hidden sm:mr-[1rem] mr-[0.3rem]">
                <div className="text-[#0477ad] text-sm font-medium font-inter">
                  Resetear
                </div>
              </div>
            </div>
            <div className="h-20 relative bg-white border-b border-[#c5dfff] overflow-hidden flex sm:gap-[1rem] lg:gap-[3rem] gap-[1.2rem] items-center">
              <div className="text-[#3d4245] text-base font-semibold font-inter sm:ml-[1rem] ml-[0.3rem] sm:w-[9rem] w-[5rem]">
                Omar Chauderon
              </div>
              <div className="text-[#3d4245] text-center font-semibold font-inter w-[1.5rem]">
                1
              </div>
              <div className="text-[#3d4245] text-base font-semibold font-inter sm:w-[12rem] w-[6rem]">
                2019-07-15T 17:14:52.739Z
              </div>
              <div className=" px-[18px] py-2 bg-white rounded-lg border border-[#0477ad] justify-center items-center gap-1 inline-flex overflow-hidden sm:mr-[1rem] mr-[0.3rem]">
                <div className="text-[#0477ad] text-sm font-medium font-inter">
                  Resetear
                </div>
              </div>
            </div>
            <div className="h-20 relative bg-white border-b border-[#c5dfff] overflow-hidden flex sm:gap-[1rem] lg:gap-[3rem] gap-[1.2rem] items-center">
              <div className="text-[#3d4245] text-base font-semibold font-inter sm:ml-[1rem] ml-[0.3rem] sm:w-[9rem] w-[5rem]">
                Omar Chauderon
              </div>
              <div className="text-[#3d4245] text-center font-semibold font-inter w-[1.5rem]">
                1
              </div>
              <div className="text-[#3d4245] text-base font-semibold font-inter sm:w-[12rem] w-[6rem]">
                2019-07-15T 17:14:52.739Z
              </div>
              <div className=" px-[18px] py-2 bg-white rounded-lg border border-[#0477ad] justify-center items-center gap-1 inline-flex overflow-hidden sm:mr-[1rem] mr-[0.3rem]">
                <div className="text-[#0477ad] text-sm font-medium font-inter">
                  Resetear
                </div>
              </div>
            </div>
            <div className="h-20 relative bg-white border-b border-[#c5dfff] overflow-hidden flex sm:gap-[1rem] lg:gap-[3rem] gap-[1.2rem] items-center">
              <div className="text-[#3d4245] text-base font-semibold font-inter sm:ml-[1rem] ml-[0.3rem] sm:w-[9rem] w-[5rem]">
                Omar Chauderon
              </div>
              <div className="text-[#3d4245] text-center font-semibold font-inter w-[1.5rem]">
                1
              </div>
              <div className="text-[#3d4245] text-base font-semibold font-inter sm:w-[12rem] w-[6rem]">
                2019-07-15T 17:14:52.739Z
              </div>
              <div className=" px-[18px] py-2 bg-white rounded-lg border border-[#0477ad] justify-center items-center gap-1 inline-flex overflow-hidden sm:mr-[1rem] mr-[0.3rem]">
                <div className="text-[#0477ad] text-sm font-medium font-inter">
                  Resetear
                </div>
              </div>
            </div>
            <div className="h-20 relative bg-white border-b border-[#c5dfff] overflow-hidden flex sm:gap-[1rem] lg:gap-[3rem] gap-[1.2rem] items-center">
              <div className="text-[#3d4245] text-base font-semibold font-inter sm:ml-[1rem] ml-[0.3rem] sm:w-[9rem] w-[5rem]">
                Omar Chauderon
              </div>
              <div className="text-[#3d4245] text-center font-semibold font-inter w-[1.5rem]">
                1
              </div>
              <div className="text-[#3d4245] text-base font-semibold font-inter sm:w-[12rem] w-[6rem]">
                2019-07-15T 17:14:52.739Z
              </div>
              <div className=" px-[18px] py-2 bg-white rounded-lg border border-[#0477ad] justify-center items-center gap-1 inline-flex overflow-hidden sm:mr-[1rem] mr-[0.3rem]">
                <div className="text-[#0477ad] text-sm font-medium font-inter">
                  Resetear
                </div>
              </div>
            </div>
            <div className="h-20 relative bg-white border-b border-[#c5dfff] overflow-hidden flex sm:gap-[1rem] lg:gap-[3rem] gap-[1.2rem] items-center">
              <div className="text-[#3d4245] text-base font-semibold font-inter sm:ml-[1rem] ml-[0.3rem] sm:w-[9rem] w-[5rem]">
                Omar Chauderon
              </div>
              <div className="text-[#3d4245] text-center font-semibold font-inter w-[1.5rem]">
                1
              </div>
              <div className="text-[#3d4245] text-base font-semibold font-inter sm:w-[12rem] w-[6rem]">
                2019-07-15T 17:14:52.739Z
              </div>
              <div className=" px-[18px] py-2 bg-white rounded-lg border border-[#0477ad] justify-center items-center gap-1 inline-flex overflow-hidden sm:mr-[1rem] mr-[0.3rem]">
                <div className="text-[#0477ad] text-sm font-medium font-inter">
                  Resetear
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default UsuariosComponent;

{
  /* 
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


    
    </ul> */
}
