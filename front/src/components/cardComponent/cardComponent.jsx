import { Link } from 'react-router-dom';
import imagen from './vehiculoCorralon.png'

function CardComponent({id, tipo, dominio, egreso, numeroActa, lugar, fecha_hora}) {

    const date = new Date(fecha_hora); // Fecha en UTC

    // Ajustar a zona horaria de Argentina
    const options = { timeZone: 'America/Argentina/Buenos_Aires', hour12: false };
    /* console.log(date.toLocaleString('es-AR', options)); */

    const estado = egreso ? "Egresado" : "Ingresado";
    const dominioA = dominio ? dominio : "Sin dominio";



    
    return (
        

    <Link to={`/detail/${id}`} class="flex flex-col items-center bg-white border border-gray-200 rounded-lg shadow md:flex-row md:max-w-xl">
    <div class="w-full md:w-1/2 h-full">
        <img class="object-cover w-full h-full rounded-t-lg md:rounded-none md:rounded-s-lg" src={imagen} alt=""/>
    </div>
    <div className="flex flex-col justify-between px-2 leading-normal">
        <h5 className="mb-1 text-l font-bold tracking-tight text-gray-900 dark:text-black leading-tight">{tipo}, {dominioA}</h5>
        <p className="mb-1 md:text-sm text-xl font-normal leading-tight text-gray-700 dark:text-gray-400">Estado: {estado} N° acta: {numeroActa}</p>
        <p className="mb-1 md:text-sm text-xl font-normal leading-tight">{lugar}</p>
        <p className="md:text-sm text-xl font-normal text-gray-700 dark:text-gray-400 leading-tight">{date.toLocaleString('es-AR', options)}</p>
    </div>
    </Link>

       
       
    );
  }
  
  export default CardComponent;

  {/* <a href="#" class="flex flex-col items-center bg-white border border-gray-200 rounded-lg shadow md:flex-row md:max-w-xl">
        <img class="object-cover w-full rounded-t-lg h-96 md:h-auto md:w-1/2 md:rounded-none md:rounded-s-lg" src={imagen} alt=""/>
        <div class="flex flex-col justify-between px-2 leading-normal">
            <h5 class="mb-1 text-l font-bold tracking-tight text-gray-900 dark:text-black leading-tight">{tipo}, {dominio}</h5>
            <p class="mb-1 md:text-sm text-xl font-normal leading-tight text-gray-700 dark:text-gray-400">Estado: {estado} N° acta:{numeroActa}</p>
            <p class="mb-1 md:text-sm text-xl font-normal leading-tight">{lugar}</p>
            <p class="md:text-sm text-xl font-normal text-gray-700 dark:text-gray-400 leading-tight">{fecha}, {hora}</p>
        </div>
    </a> */}