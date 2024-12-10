import { useNavigate } from 'react-router-dom';

import { useEffect, useState } from 'react';

import snLogo from './sn-logo-blanco.png'
import snFondo from './sn-imagen-fondo.jpeg'
import { useDispatch } from 'react-redux';
import { postUsers, updateCurrentUser } from '../../redux/actions';



/* Luego descomentar required para que sea un campo requerido!!!! */




function Landing() {

  const navigate = useNavigate();
  const dispatch= useDispatch();


  const login= async (userData)=> {
    /* const { usuario, contraseña } = userData;
    if (usuario==="usuario" && contraseña==="123asd"){
        dispatch(updateCurrentUser(1))
        navigate('/home')
    }else if (usuario==="usuario2" && contraseña==="123asd"){
      dispatch(updateCurrentUser(2))
      navigate('/home')
    }else if (usuario==="admin" && contraseña==="123asd"){
      dispatch(updateCurrentUser(0))
      navigate('/allTramites')
    }else{
        throw Error("Usuario o contraseña incorrectos")
    } */
        navigate('/inicio')
  }


  const [userData, setUserData]= useState({
    usuario: '',
    contraseña: ''
  })

  /* useEffect(() => {
    dispatch(postUsers())
  }, []); */

  const handleChange= (event)=>{
    setUserData({
        ...userData,
        [event.target.name] : event.target.value
    })
  }


  const handleSubmit=(event)=>{
    event.preventDefault();
    
    login(userData)
  }




  return (
    <div className="w-full h-screen  flex flex-col justify-start items-center gap-[10rem]">
    {/* Encabezado */}
    <div className="w-full h-[5rem]  py-[1rem] bg-[#0477ad] shadow flex items-center">
      <div className="relative w-full h-full justify-start items-center flex">
        <img src={snLogo} alt="Logo San Nicolas" className="w-[3rem] ml-[1.5rem]"/>
        <div className=" w-[39px] border border-[#f6f5f5]  rotate-90" />
        <div className=" text-[#f6f5f5] text-sm font-normal font-inter">
          Corralón San Nicolás
        </div>
      </div>
    </div>

    <img src={snFondo} alt="" className="absolute w-full h-full object-cover top-0 left-0 -z-10"/>

    {/* Contenedor principal */}
    <div className="w-full max-w-md px-8 py-10 bg-white rounded-lg shadow flex flex-col justify-center items-center gap-1">
      <div className="h-[317px] flex flex-col justify-center items-start gap-10">
        {/* Título */}
        <div className="text-[#3d4245] text-2xl font-bold font-inter">
          Inicio de sesión
        </div>

        {/* Formulario */}
        <div className="flex flex-col justify-start items-start gap-6">
          {/* Campo DNI */}
          <div className="h-[75px] flex flex-col justify-start items-start gap-2">
            <label className="text-[#3d4245] text-sm font-normal font-inter">
              DNI
            </label>
            <div className="self-stretch h-[50px] p-2 rounded-md border border-[#687073] flex items-center gap-1">
              <input
                type="text"
                placeholder="0000000000000"
                className="w-full text-[#a3b8c1] text-sm font-normal font-inter outline-none"
              />
            </div>
          </div>

          {/* Campo Contraseña */}
          <div className="h-[75px] flex flex-col justify-start items-start gap-2">
            <label className="text-[#3d4245] text-sm font-normal font-inter">
              Contraseña
            </label>
            <div className="self-stretch h-[50px] pl-2 pr-3 py-2 rounded-md border border-[#687073] flex justify-between items-center">
              <input
                type="password"
                placeholder="Contraseña"
                className="w-full text-[#a3b8c1] text-sm font-normal font-inter outline-none"
              />
              <div className="w-5 h-5" />
            </div>
          </div>

          {/* Botón */}
          <button className="w-full h-[50px] px-[18px] py-[13px] bg-[#0477ad] rounded-lg flex justify-center items-center gap-1">
            <span className="text-[#f6f5f5] text-base font-semibold font-inter">
              Iniciar sesión
            </span>
          </button>
        </div>
      </div>
    </div>
  </div>
  );
}

export default Landing;


/*  <div class="flex min-h-full flex-col justify-center px-6 py-8 lg:px-8">
  <div class="sm:mx-auto sm:w-full sm:max-w-sm">
    <img class="mx-auto  w-auto" src={snLogo} alt="Your Company"/>
    <h2 class="mt-8 text-center text-2xl font-bold leading-9 tracking-tight text-gray-900">Ingreso a tu cuenta</h2>
  </div>

  <div class="mt-10 sm:mx-auto sm:w-full sm:max-w-sm">
    <form class="space-y-6" onSubmit={handleSubmit}>
      <div>
        <label class="block text-sm font-medium leading-6 text-gray-900">Usuario</label>
        <div class="mt-2">
          <input
           class="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
           
           value={userData.usuario} name='usuario' onChange={handleChange}/>
        </div>
      </div>

      <div>
        <div class="flex items-center justify-between">
          <label class="block text-sm font-medium leading-6 text-gray-900">Contraseña</label>
          <div class="text-sm">
            <a  class="font-semibold text-indigo-600 hover:text-indigo-500">Olvidaste tu contraseña?</a>
          </div>
        </div>
        <div class="mt-2">
          <input 
             class="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
            
            value={userData.contraseña} name='contraseña' onChange={handleChange}/>
        </div>
      </div>

      <div>
        <button
         type="submit"
         class="flex w-full justify-center rounded-md bg-indigo-600 px-3 py-1.5 text-sm font-semibold leading-6 text-white shadow-sm hover:bg-indigo-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600"

         
         >Ingresar
         </button>
      </div>
    </form>

    <p class="mt-6 text-center text-sm text-gray-500">
      No estás registrado?
      <a  class="font-semibold leading-6 text-indigo-600 hover:text-indigo-500">Crea una cuenta</a>
    </p>
    
  </div>
</div> */