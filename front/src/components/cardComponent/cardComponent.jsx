import { Link } from 'react-router-dom';
import imagen from './vehiculoCorralon.png'

function CardComponent({id, tipo, dominio, egreso, numeroActa, lugar, fecha_hora, foto}) {

    const date = new Date(fecha_hora); // Fecha en UTC

    // Ajustar a zona horaria de Argentina
    const options = { timeZone: 'America/Argentina/Buenos_Aires', hour12: false };
    

    const estado = egreso ? "Egresado" : "Ingresado";

    foto = foto.replace(".png", ".jpg");

    
    return (
        

    <Link to={`/detail/${3}`} class="flex overflow-hidden border-[0.5px] items-center bg-white border border-[#C5E0FF] gap-1 pr-1 rounded-lg shadow-[1px_2px_8px_1px_rgba(219,219,219,0.45)] flex-row md:max-w-xl">
    <div class="w-full md:w-1/2 h-full">
        <img class="object-cover w-full h-full rounded-l-lg md:rounded-none md:rounded-s-lg" src={`https://corralon.movisn.com/api${foto}`} alt="vehiculo"/>
    </div>
    <div className="flex flex-col justify-between px-2 leading-normal gap-1.5">
        <div className="mb-1 text-[18px] font-inter font-bold break-words  text-[#3E4345] ">{tipo}, {dominio}</div>
    <div className="gap-1">
        <div class="self-stretch text-[#687073] text-[14px] font-inter font-medium break-words">Estado: {estado}</div>
        <div class="self-stretch text-[#687073] text-[14px] font-inter font-medium break-words">N° acta: {numeroActa}</div>
        <div class="text-[#687073] text-[14px] font-inter font-medium break-words">{lugar}</div>
        <div class="self-stretch text-[#687073] text-[14px] font-inter font-medium break-words">{date.toLocaleString('es-AR', options)}</div>
    </div>
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