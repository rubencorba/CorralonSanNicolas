import imagen from './vehiculoCorralon.png'

function CardComponent() {

    
    return (
        <a href="#" class="flex flex-col items-center bg-white border border-gray-200 rounded-lg shadow md:flex-row md:max-w-xl">
        {/* <img class="object-cover w-full rounded-t-lg h-96 md:h-auto md:w-48 md:rounded-none md:rounded-s-lg" src={imagen} alt=""/> */}
        <img class="object-cover w-full rounded-t-lg h-96 md:h-auto md:w-1/2 md:rounded-none md:rounded-s-lg" src={imagen} alt=""/>
        <div class="flex flex-col justify-between px-2 leading-normal">
            <h5 class="mb-1 text-l font-bold tracking-tight text-gray-900 dark:text-black leading-tight">Automovil CFE657</h5>
            <p class="mb-1 md:text-sm text-xl font-normal leading-tight text-gray-700 dark:text-gray-400">Estado: Ingresado N° acta:12245</p>
            <p class="mb-1 md:text-sm text-xl font-normal leading-tight">ALMAFUERTE 30</p>
            <p class="md:text-sm text-xl font-normal text-gray-700 dark:text-gray-400 leading-tight">15-05-08 13:45</p>
        </div>
    </a>
       
       
    );
  }
  
  export default CardComponent;