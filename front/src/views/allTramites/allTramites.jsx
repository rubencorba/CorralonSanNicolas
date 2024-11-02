import {Route,Routes, useLocation} from "react-router-dom";

import { Fragment, useEffect, useState } from 'react'
import Navbar from "../../components/navbar/navbarComponent";
import { useDispatch, useSelector } from "react-redux";
import { getAllTramites, getAllUsers, updateTramiteAprobado, updateTramiteRechazado } from "../../redux/actions";
import NavBar2 from "../../components/navBar2/navBar2";





function AllTramites() {

    const dispatch= useDispatch()

    useEffect(() => {
        dispatch(getAllTramites())
    }, []);

    const tramites = useSelector((state) => state.allTramites)
    const tramitesPendientes = tramites.filter((tramite) => tramite.estado === 'pendiente')

    const [comentario, setComentario]= useState('')
    const [showPopup, setShowPopup] = useState(false);

    const handleAprobar= (id)=>{
       dispatch(updateTramiteAprobado(comentario,id))

       setShowPopup(true);
       
    }
    const handleRechazar= (id)=>{
        dispatch(updateTramiteRechazado(comentario,id))

        setShowPopup(true);
       
    }


    const actualizar= ()=>{
      window.location.reload();
    }
    
    

  return (
    <div>
    <Navbar></Navbar>
  <NavBar2></NavBar2>

    {tramitesPendientes.map((tramite, index) => (
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
                <input
                 type="text" 
                 class="w-full h-16 text-xs p-4 border border-gray-300 rounded-md"
                 
                 onChange={(e) => {
                    setComentario(e.target.value)
                  }}/>
            </dd>
          </div>


          <div class="flex justify-center space-x-4">
  <button class="bg-green-500 hover:bg-green-600 text-white font-bold py-2 px-4 rounded" onClick={()=>handleAprobar(tramite.id)}>
    Aprobar
  </button>
  <button class="bg-red-500 hover:bg-red-600 text-white font-bold py-2 px-4 rounded" onClick={()=>handleRechazar(tramite.id)}>
    Rechazar
  </button>
</div>
         
        </dl>
      </div>
    </div>
    </div>
    ))}

     {/* Pop-up */}
     {showPopup && (
        <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50">
          <div className="bg-white p-6 rounded shadow-lg">
            <p>Trámite actualizado exitosamente!!</p>
            <button 
              onClick={
                () => {
                  setShowPopup(false);
                  actualizar()
                }} 
              className="mt-4 bg-blue-500 text-white px-4 py-2 rounded">
              Cerrar
            </button>
          </div>
        </div>
      )}


    </div>



  );
}

export default AllTramites;