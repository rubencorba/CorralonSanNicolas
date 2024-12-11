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
    <div className="w-full h-screen  flex flex-col justify-start items-center gap-[6rem]">
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
    <div className="sm:w-full max-w-[22rem] mx-5 sm:px-6 px-8 py-3 bg-white rounded-lg shadow flex flex-col justify-center items-center ">
      <div className="py-5 flex flex-col justify-center items-center gap-7 sm:w-[18rem]">
        {/* Título */}
        <div className="text-[#3d4245] text-xl font-bold font-inter text start w-full">
          Inicio de sesión
        </div>

        {/* Formulario */}
        <form  onSubmit={handleSubmit}>
        <div className="flex flex-col justify-start items-start gap-5">
          {/* Campo DNI */}
          <div className=" flex flex-col justify-start items-start gap-1">
            <label className="text-[#3d4245] text-sm font-normal font-inter">
              DNI
            </label>
            {/* <div className="self-stretch h-[50px] p-2 rounded-md border border-[#687073] flex items-center gap-1"> */}
              
              <input
                type="text"
                placeholder="0000000000000"
                className="sm:w-[18rem] w-[14rem] text-[#a3b8c1] text-sm font-normal font-inter outline-none rounded-md"
              />
              
            {/* </div> */}
          </div>

          {/* Campo Contraseña */}
          <div className=" flex flex-col justify-start items-start gap-1">
            <label className="text-[#3d4245] text-sm font-normal font-inter">
              Contraseña
            </label>
           {/*  <div className="self-stretch h-[50px] pl-2 pr-3 py-2 rounded-md border border-[#687073] flex justify-between items-center"> */}
           <div className="relative sm:w-[18rem] w-[14rem] ">
  <input
    type="password"
    placeholder="Contraseña"
    className="w-full text-[#a3b8c1] text-sm font-normal font-inter outline-none rounded-md pl-4 pr-10 py-2 "
  />
  <button className="absolute right-2 top-1/2 transform -translate-y-1/2 text-gray-500 hover:text-gray-700">
    <svg
      xmlns="http://www.w3.org/2000/svg"
      fill="none"
      viewBox="0 0 24 24"
      strokeWidth={1.5}
      stroke="currentColor"
      className="w-5 h-5"
    >
      <path
        strokeLinecap="round"
        strokeLinejoin="round"
        d="M3.98 8.223A10.477 10.477 0 0 0 1.934 12C3.226 16.338 7.244 19.5 12 19.5c.993 0 1.953-.138 2.863-.395M6.228 6.228A10.451 10.451 0 0 1 12 4.5c4.756 0 8.773 3.162 10.065 7.498a10.522 10.522 0 0 1-4.293 5.774M6.228 6.228 3 3m3.228 3.228 3.65 3.65m7.894 7.894L21 21m-3.228-3.228-3.65-3.65m0 0a3 3 0 1 0-4.243-4.243m4.242 4.242L9.88 9.88"
      />
    </svg>
  </button>
</div>
              {/* <div className="w-5 h-5" /> */}
           {/*  </div> */}
          </div>

          {/* Botón */}
          <button type="submit" className="w-full mt-1 py-[9px] bg-[#0477ad] rounded-lg flex justify-center items-center ">
            <span className="text-[#f6f5f5] text-sm font-semibold font-inter">
              Iniciar sesión
            </span>
          </button>
        </div>
        </form>
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