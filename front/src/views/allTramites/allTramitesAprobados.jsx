import {Route,Routes} from "react-router-dom";

import { Fragment, useEffect, useState } from 'react'
import Navbar from "../../components/navbar/navbarComponent";
import { useDispatch, useSelector } from "react-redux";
import { getAllTramites, getAllUsers, updateTramiteAprobado, updateTramiteRechazado } from "../../redux/actions";
import NavBar2 from "../../components/navBar2/navBar2";





function AllTramitesAprobados() {

    const dispatch= useDispatch()

    useEffect(() => {
        dispatch(getAllTramites())
    }, []);

    const tramites = useSelector((state) => state.allTramites)
    const tramitesAprobados = tramites.filter((tramite) => tramite.estado === 'aprobado')

   /*  const [comentario, setComentario]= useState('')
    const [showPopup, setShowPopup] = useState(false);

    const handleAprobar= (id)=>{
       dispatch(updateTramiteAprobado(comentario,id))

       setShowPopup(true);
    }
    const handleRechazar= (id)=>{
        dispatch(updateTramiteRechazado(comentario,id))

        setShowPopup(true);
    }
     */



  return (
    <div>
    <Navbar></Navbar>
    <NavBar2></NavBar2>

    {tramitesAprobados.map((tramite, index) => (
    <div className="min-h-screen flex items-center justify-center bg-gray-100">
    <div className="bg-white p-8 rounded-lg shadow-lg max-w-md w-full my-24">

      <div className="px-4 sm:px-0">
        <h3 className="text-base font-semibold leading-7 text-gray-900">Información del Trámite</h3>
        <p className="mt-1 max-w-2xl text-sm leading-6 text-gray-500">Detalles personales</p>
      </div>
      <div className="mt-6 border-t border-gray-100">
        <dl className="divide-y divide-gray-100">
          <div className="px-4 py-6 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-0">
            <dt className="text-sm font-medium leading-6 text-gray-900">Nombre completo</dt>
            <dd className="mt-1 text-sm leading-6 text-gray-700 sm:col-span-2 sm:mt-0">{tramite.name}</dd>
          </div>
          <div className="px-4 py-6 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-0">
            <dt className="text-sm font-medium leading-6 text-gray-900">Fecha de nacimiento</dt>
            <dd className="mt-1 text-sm leading-6 text-gray-700 sm:col-span-2 sm:mt-0">{tramite.fechaNacimiento}</dd>
          </div>
          <div className="px-4 py-6 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-0">
            <dt className="text-sm font-medium leading-6 text-gray-900">Domicilio</dt>
            <dd className="mt-1 text-sm leading-6 text-gray-700 sm:col-span-2 sm:mt-0">{tramite.domicilio}</dd>
          </div>
          <div className="px-4 py-6 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-0">
            <dt className="text-sm font-medium leading-6 text-gray-900">DNI</dt>
            <dd className="mt-1 text-sm leading-6 text-gray-700 sm:col-span-2 sm:mt-0">{tramite.dni}</dd>
          </div>
          <div className="px-4 py-6 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-0">
            <dt className="text-sm font-medium leading-6 text-gray-900">Sexo</dt>
            <dd className="mt-1 text-sm leading-6 text-gray-700 sm:col-span-2 sm:mt-0">{tramite.sexo}</dd>
          </div>
          <div className="px-4 py-6 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-0">
            <dt className="text-sm font-medium leading-6 text-gray-900">Foto frontal DNI</dt>
            <dd className="mt-1 text-sm leading-6 text-gray-700 sm:col-span-2 sm:mt-0">
              <img src={tramite.imagen} alt="foto del DNI" />
            </dd>
          </div>
          <div className="px-4 py-6 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-0">
            <dt className="text-sm font-medium leading-6 text-gray-900">Comentario</dt>
            <dd className="mt-1 text-sm leading-6 text-gray-700 sm:col-span-2 sm:mt-0">
            {tramite.comentario}
            </dd>
          </div>
         
        </dl>
      </div>
    </div>
    </div>
    ))}
    </div>

  );
}

export default AllTramitesAprobados;