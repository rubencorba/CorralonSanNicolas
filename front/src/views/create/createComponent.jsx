import { useEffect, useState } from 'react';

import { postTramite } from '../../redux/actions';
import { useDispatch, useSelector } from 'react-redux';
import Navbar from '../../components/navbar/navbarComponent';

function Create() {

  const userId = useSelector((state) => state.currentUser)

  const [input, setInput] = useState({sexo:'Masculino'})
  const dispatch = useDispatch()
  

  /* **************************************Cloudinary************************************* */

  const preset_name = "firstPreset";                         //16 Pegamos el "name" rescatado en el punto 24
    const cloud_name = "dswkgws0z"                          //16.2 Pegamos el cloud_name rescatado en punto 20

    const [ image, setImage ] = useState('');       //12 Creamos estado local que guarde la url de la imagen subida
    const [ loading, setLoading ] = useState(false) //7 Creamos un estado local con valor incial boolean "false" para saber si la imagen esta cargando.
  

    const uploadImage = async (/* e */files)=>{            //2 Preparamos para recibir el evento al ejecutarse la función async
        /* const files = e.target.files */            //3 recuperamos el array de e.target.files
        const data = new FormData()             //4 Creamos/Instanciamos un FormData objeto con nombre data
        data.append('file', files/* [0] */)           //5 Utilizando metodo append() agregamos al data el archivo desde files[0]
        data.append('upload_preset',preset_name)  //6 Como prop "upload preset" le pasamos la variable de la linea 6 (punto 16.2).

        setLoading(true)                        //8 Ponemos en true el estado local que indica que la imagen esta cargándose.

        try {
            //10 enviamos el pedido de upload con el data en body 
            const response = await fetch(`https://api.cloudinary.com/v1_1/${cloud_name}/image/upload`, {
                method: 'POST',
                body: data
            });

            const file = await response.json();     //11 Traducimos la respuesta de JSON
            setImage(file.secure_url);              //13 Recuperamos la url de la imagen en estado local
            /* console.log(file.secure_url) */
            setLoading(false);                      //14 Dejamos el loading en false para que intente mostrar la magen
            //await actions.sendPhoto(file.secure_url) //15 Enviamos la url a un action para hacer algo en back. Lo dejamos bloqueado para que no de error de importacion de Context actions o de la función.
        } catch (error) {
            console.error('Error uploading image:', error);
            setLoading(false);
        }

    }

  /* *************************************************************************** */
    
    //Subir archivo desde el botón
    const handleFileChange = (event) => {
      uploadImage(event.target.files[0])
    };

    //Subir archivo arrastrando
    const handleDrop =(event) => {
      event.preventDefault(); // Evita que el navegador abra el archivo
      uploadImage(event.dataTransfer.files[0])

    };
  
    const handleDragOver = (event) => {
      event.preventDefault(); // Evita el comportamiento por defecto
    };
    /* *************************************************************************** */

    const [showPopup, setShowPopup] = useState(false);

    useEffect(() => {
      setInput({ 
        ...input,
        imagen: image,
        UserId: userId }) //Si currentUser es 1, el UserId será 1
    }, [image]);

    const handleSubmit = (event) => {
      event.preventDefault(); // Evita el comportamiento por defecto
      dispatch(postTramite(input))

      setShowPopup(true);
    };

  return (
    <div>
    <Navbar></Navbar>
    <div className="min-h-screen flex items-center justify-center bg-gray-100">
      <div className="bg-white p-8 rounded-lg shadow-lg max-w-md w-full my-24">
    <form onSubmit={handleSubmit}>
      <div class="space-y-12">
      <h2 class="text-base font-semibold leading-7 text-gray-900">Información personal para el Trámite</h2>
  
      <div class="mt-10 grid grid-cols-1 gap-x-6 gap-y-8 sm:grid-cols-6">
        <div class="sm:col-span-4">
          <label for="first-name" class="block text-sm font-medium leading-6 text-gray-900">Apellido y Nombre</label>
          <div class="mt-2">
            <input
             type="text" 
             name="first-name" 
             id="first-name" 
             autocomplete="given-name" 
             class="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
             
             onChange={(e) => {
              setInput({ ...input, name: e.target.value })
            }}/>
          </div>
        </div>

          <div class="sm:col-span-4">
            <label htmlFor="fecha-nacimiento" className="block text-sm font-medium text-gray-700 leading-6">
              Fecha de Nacimiento
            </label>
            <div className="mt-2">
            <input
              id="fecha-nacimiento"
              name="fecha-nacimiento"
              type="date"
              required
              className=" block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm placeholder-gray-400 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"

              onChange={(e) => {
                setInput({ ...input, fechaNacimiento: e.target.value })
              }}
            />
            </div>
          </div>

        <div class="sm:col-span-4">
          <label for="email" class="block text-sm font-medium leading-6 text-gray-900">Numero de DNI</label>
          <div class="mt-2">
            <input
             id="email" 
             name="email" 
             /* type="email" autocomplete="email" */ 
             class="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
             
             onChange={(e) => {
              setInput({ ...input, dni: e.target.value })
            }}
             />
          </div>
        </div>

        <div class="sm:col-span-3">
          <label for="country" class="block text-sm font-medium leading-6 text-gray-900">Sexo</label>
          <div class="mt-2">
            <select
             id="country" 
             name="country" 
             autocomplete="country-name" 
             class="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:max-w-xs sm:text-sm sm:leading-6"
             
             onChange={(e) => {
              setInput({ ...input, sexo: e.target.value })
            }}
             >
              <option>Masculino</option>
              <option>Femenino</option>
              <option>Otro</option>
            </select>
          </div>
        </div>

        <div class="sm:col-span-2 sm:col-start-1">
          <label for="city" class="block text-sm font-medium leading-6 text-gray-900">Calle</label>
          <div class="mt-2">
            <input
             type="text" 
             name="city" 
             id="city" 
             autocomplete="address-level2" 
             class="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
             
             onChange={(e) => {
              setInput({ ...input, domicilio: e.target.value })
            }}
             />
          </div>
        </div>

        <div class="sm:col-span-2">
          <label for="region" class="block text-sm font-medium leading-6 text-gray-900">Numero</label>
          <div class="mt-2">
            <input
             type="text" 
             name="region" 
             id="region" 
             autocomplete="address-level1" 
             class="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
             
             onChange={(e) => {
              setInput({ ...input, numero:e.target.value})
            }}/>
          </div>
        </div>

        <div class="sm:col-span-2">
          <label for="postal-code" class="block text-sm font-medium leading-6 text-gray-900">Dpto-Piso</label>
          <div class="mt-2">
            <input
             type="text" 
             name="postal-code" 
             id="postal-code" 
             autocomplete="address-level1" 
             class="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
             
             onChange={(e) => {
              setInput({ ...input, dptoPiso:e.target.value})
            }}/>
          </div>
        </div>


        {!image ? (
      <div class="col-span-full">
          <label for="cover-photo" class="block text-sm font-medium leading-6 text-gray-900">Foto DNI frontal</label>
          <div
            class="mt-2 flex justify-center rounded-lg border border-dashed border-gray-900/25 px-6 py-10"
           
            onDrop={handleDrop}
            onDragOver={handleDragOver}>
            <div class="text-center">
              <svg class="mx-auto h-12 w-12 text-gray-300" viewBox="0 0 24 24" fill="currentColor" aria-hidden="true">
                <path fill-rule="evenodd" d="M1.5 6a2.25 2.25 0 012.25-2.25h16.5A2.25 2.25 0 0122.5 6v12a2.25 2.25 0 01-2.25 2.25H3.75A2.25 2.25 0 011.5 18V6zM3 16.06V18c0 .414.336.75.75.75h16.5A.75.75 0 0021 18v-1.94l-2.69-2.689a1.5 1.5 0 00-2.12 0l-.88.879.97.97a.75.75 0 11-1.06 1.06l-5.16-5.159a1.5 1.5 0 00-2.12 0L3 16.061zm10.125-7.81a1.125 1.125 0 112.25 0 1.125 1.125 0 01-2.25 0z" clip-rule="evenodd" />
              </svg>
              <div class="mt-4 flex text-sm leading-6 text-gray-600">
                <label for="file-upload" class="relative cursor-pointer rounded-md bg-white font-semibold text-indigo-600 focus-within:outline-none focus-within:ring-2 focus-within:ring-indigo-600 focus-within:ring-offset-2 hover:text-indigo-500">
                  <span>Subir archivo</span>
                  <input
                   id="file-upload" 
                   name="file-upload" 
                   type="file" 
                   class="sr-only"
                   
                   onChange={handleFileChange}/>
                </label>
                <p class="pl-1">o arrastre la foto hasta aquí</p> 
              </div>
              <p class="text-xs leading-5 text-gray-600">PNG, JPG, GIF hasta 10MB</p>
            </div>
          </div>
        </div>
        ):(
          /* 9 - Si loading true, Mostramos Loading, si no mostramos la imagen la cual su url deberia estar cargada en un estado local */
          loading ? (
            <h3>Loading...</h3>
          ) : (
            <img src={image} alt="imagen subida" class="col-span-full"/>
          )
          /* ------------------------------------------------------------------------------------ */
        )}
        </div>

      <div class="mt-6 flex items-center justify-end gap-x-6">
        <button type="button" class="text-sm font-semibold leading-6 text-gray-900">Cancelar</button>
        <button type="submit" class="rounded-md bg-indigo-600 px-3 py-2 text-sm font-semibold text-white shadow-sm hover:bg-indigo-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600">Enviar</button>
      </div>
    </div>

        {/* Pop-up */}
      {showPopup && (
        <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50">
          <div className="bg-white p-6 rounded shadow-lg">
            <p>Trámite enviado exitosamente, podrá hacerle seguimiento en "Mis Trámites"</p>
            <button 
              onClick={() => setShowPopup(false)} 
              className="mt-4 bg-blue-500 text-white px-4 py-2 rounded">
              Cerrar
            </button>
          </div>
        </div>
      )}



    </form>
    </div>
    </div>

    </div>
  );
}

export default Create;