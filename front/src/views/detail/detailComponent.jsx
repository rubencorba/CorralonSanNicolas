/* import {getDetailCountry} from '../../redux/actions/index' */
import { useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { useParams } from "react-router-dom";
import Navbar from '../../components/navbar/navbarComponent'
import { getDetailVehiculo } from '../../redux/actions';
import imagen from './vehiculoCorralon.png'

function DetailComponent() {

  const detail= useSelector((state)=>state.detail)

  const dispatch=useDispatch()
  let {id}= useParams();
  
  useEffect(()=>{
    dispatch(getDetailVehiculo(id))
  },[id])


  return (
    <div>
      <Navbar></Navbar>
      <h3 className="text-base/7 font-semibold text-gray-900 text-center">{detail.dominio}</h3>

      <div className="min-h-screen flex items-center justify-center bg-[#F5FAFF]">
    <div className="bg-white p-2.5 rounded-lg shadow-lg  my-12     grid grid-cols-1 mid:grid-cols-3 custom:grid-cols-2">

    <div>
    <div class="flex justify-center items-center gap-[0.5rem] my-[25px] ">
      <div class="w-[13rem] h-[50px] px-[15px] py-[13px] bg-[#0477AD] rounded-[8px] overflow-hidden justify-center items-center  flex">
        <button  class="text-[#F6F5F5] text-[16px] font-inter font-semibold break-words flex gap-[5px]">
      Imprimir QR
          <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="size-6">
            <path strokeLinecap="round" strokeLinejoin="round" d="M3.75 4.875c0-.621.504-1.125 1.125-1.125h4.5c.621 0 1.125.504 1.125 1.125v4.5c0 .621-.504 1.125-1.125 1.125h-4.5A1.125 1.125 0 0 1 3.75 9.375v-4.5ZM3.75 14.625c0-.621.504-1.125 1.125-1.125h4.5c.621 0 1.125.504 1.125 1.125v4.5c0 .621-.504 1.125-1.125 1.125h-4.5a1.125 1.125 0 0 1-1.125-1.125v-4.5ZM13.5 4.875c0-.621.504-1.125 1.125-1.125h4.5c.621 0 1.125.504 1.125 1.125v4.5c0 .621-.504 1.125-1.125 1.125h-4.5A1.125 1.125 0 0 1 13.5 9.375v-4.5Z" />
            <path strokeLinecap="round" strokeLinejoin="round" d="M6.75 6.75h.75v.75h-.75v-.75ZM6.75 16.5h.75v.75h-.75v-.75ZM16.5 6.75h.75v.75h-.75v-.75ZM13.5 13.5h.75v.75h-.75v-.75ZM13.5 19.5h.75v.75h-.75v-.75ZM19.5 13.5h.75v.75h-.75v-.75ZM19.5 19.5h.75v.75h-.75v-.75ZM16.5 16.5h.75v.75h-.75v-.75Z" />
          </svg>
        </button>
      </div>
      
      <div class="flex w-[13rem] h-[50px] px-[18px] py-[13px] bg-white rounded-[8px] overflow-hidden border border-[#0477AD] justify-center items-center ">
        <button  class="text-[#0477AD] text-[16px] font-inter font-semibold break-words  flex gap-[4px]"> 
          Egreso
            <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="size-6">
            <path strokeLinecap="round" strokeLinejoin="round" d="M15.75 9V5.25A2.25 2.25 0 0 0 13.5 3h-6a2.25 2.25 0 0 0-2.25 2.25v13.5A2.25 2.25 0 0 0 7.5 21h6a2.25 2.25 0 0 0 2.25-2.25V15m3 0 3-3m0 0-3-3m3 3H9" />
            </svg>
        </button>
      </div>
    </div>
    
    <div className="px-4 sm:px-0">
      {/* <p className="mt-1 max-w-2xl text-sm/6 text-gray-500">Personal details and application.</p> */}
      <img class="object-cover w-full h-full" src={imagen} alt=""/>
    </div>
    </div>

    


    <div className="mt-6 border-t border-gray-100">
      <dl className="divide-y divide-gray-100">
        <div className="px-4 py-6 sm:grid sm:grid-cols-2 sm:gap-4 sm:px-0">
          
          <dt className="underline text-sm/6 font-medium text-gray-900">Secuestro</dt>
          <dd className="mt-1 text-sm/6 text-gray-700 sm:mt-0"></dd>
          

          
          <dt className="text-sm/6 font-medium text-gray-900">Sector</dt>
          <dd className="mt-1 text-sm/6 text-gray-700 gap-10 sm:mt-0 flex items-center">
            {detail.sector}
            <button type="button" class="px-3 py-2 text-xs font-medium text-center text-white bg-blue-700 rounded-lg hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800">
              Cambiar sector
            </button>
          </dd>
          

          
          <dt className="text-sm/6 font-medium text-gray-900 sm:col-start-1">Inventario</dt>
          <dd className="mt-1 text-sm/6 text-gray-700  sm:mt-0">{detail.inventario}</dd>
          
        </div>

        <div className="px-4 py-6 sm:grid sm:grid-cols-2 sm:gap-4 sm:px-0">
        <dt className="underline text-sm/6 font-medium text-gray-900">Acta</dt>
        <dd className="mt-1 text-sm/6 text-gray-700  sm:mt-0"></dd>
        <dt className="text-sm/6 font-medium text-gray-900">Nro.</dt>
        <dd className="mt-1 text-sm/6 text-gray-700  sm:mt-0">{detail.numeroActa}</dd>
        <dt className="text-sm/6 font-medium text-gray-900">Lugar</dt>
        <dd className="mt-1 text-sm/6 text-gray-700  sm:mt-0">{detail.lugar}</dd>
        <dt className="text-sm/6 font-medium text-gray-900">Inspector</dt>
        <dd className="mt-1 text-sm/6 text-gray-700  sm:mt-0">{detail.numeroInspector}</dd>
        <dt className="text-sm/6 font-medium text-gray-900">Fecha y Hora</dt>
        <dd className="mt-1 text-sm/6 text-gray-700  sm:mt-0">
          <span>{detail.fecha}</span>
          <span className="ml-4">{detail.hora}</span>
        </dd>
        </div>
        </dl>
        </div>



        <div>
        <dl className="divide-y divide-gray-100">
        <div className="px-4 py-6 sm:grid sm:grid-cols-2 sm:gap-4 sm:px-0">
        <dt className="underline text-sm/6 font-medium text-gray-900">Vehiculo</dt>
        <dd className="mt-1 text-sm/6 text-gray-700  sm:mt-0"></dd>
        <dt className="text-sm/6 font-medium text-gray-900">Dominio</dt>
        <dd className="mt-1 text-sm/6 text-gray-700  sm:mt-0">{detail.dominio}</dd>
        <dt className="text-sm/6 font-medium text-gray-900">Tipo</dt>
        <dd className="mt-1 text-sm/6 text-gray-700  sm:mt-0">{detail.tipo}</dd>
        <dt className="text-sm/6 font-medium text-gray-900">Marca</dt>
        <dd className="mt-1 text-sm/6 text-gray-700  sm:mt-0">{detail.marca}</dd>
        <dt className="text-sm/6 font-medium text-gray-900">Modelo</dt>
        <dd className="mt-1 text-sm/6 text-gray-700  sm:mt-0">{detail.modelo}</dd>
        </div>
        <div className="px-4 py-6 sm:grid sm:grid-cols-2 sm:gap-4 sm:px-0">
          <dt className="underline text-sm/6 font-medium text-gray-900">Infractor</dt>
          <dd className="mt-1 text-sm/6 text-gray-700  sm:mt-0"></dd>
          <dt className="text-sm/6 font-medium text-gray-900">Apellido y Nombres</dt>
          <dd className="mt-1 text-sm/6 text-gray-700  sm:mt-0">{detail.ApellidoYnombres}</dd>
          <dt className="text-sm/6 font-medium text-gray-900">DNI</dt>
          <dd className="mt-1 text-sm/6 text-gray-700  sm:mt-0">{detail.dni}</dd>
          <dt className="text-sm/6 font-medium text-gray-900">Sexo</dt>
          <dd className="mt-1 text-sm/6 text-gray-700  sm:mt-0">{detail.sexo}</dd>
          <dt className="text-sm/6 font-medium text-gray-900">CUIL</dt>
          <dd className="mt-1 text-sm/6 text-gray-700  sm:mt-0">{detail.cuil}</dd>
        </div>
        <div className="px-4 py-6  sm:gap-4 sm:px-0">
        <dt className="underline mb-3 text-sm/6 font-medium text-gray-900">Infracción/es</dt>
        <dd className="mt-1 text-sm/6 text-gray-700  sm:mt-0"></dd>
        {detail.infracciones?.map((infr)=>
                      <div>
                        {infr}
                      </div>
                    )}
        </div>
        
      </dl>

      </div>



    
  </div>
  </div>
  </div>
  )
}

export default DetailComponent