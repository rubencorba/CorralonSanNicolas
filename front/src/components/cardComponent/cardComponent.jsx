import imagen from './flyer6.jpg'

function CardComponent() {

    
    return (
        <a href="#" class="flex flex-col items-center bg-white border border-gray-200 rounded-lg shadow md:flex-row md:max-w-xl ">
        <img class="object-cover w-full rounded-t-lg h-96 md:h-auto md:w-48 md:rounded-none md:rounded-s-lg" src={imagen} alt=""/>
        <div class="flex flex-col justify-between p-4 leading-normal">
            <h5 class="mb-2 text-2xl font-bold tracking-tight text-gray-900 dark:text-black">Automovil CFE657</h5>
            <p class="mb-3 font-normal text-gray-700 dark:text-gray-400">Estado: Ingresado N° acta:12245</p>
            <p class="mb-3 font-normal ">ALMAFUERTE 30</p>
            <p class="mb-3 font-normal text-gray-700 dark:text-gray-400">15-05-08 13:45</p>
        </div>
    </a>
       
       
    );
  }
  
  export default CardComponent;