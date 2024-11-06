import {Link, Route,Routes, useLocation} from "react-router-dom";


function NavBar2() {


    let location=useLocation();
    


  return (
    <nav class=" p-4 flex justify-around items-center">
      <Link to='/ingreso'>
    <button  className="px-14 py-5 text-base font-medium text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 rounded-lg text-center dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800">Nuevo Ingreso</button>
      </Link>
    <button  className="px-14 py-5 text-base font-medium text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 rounded-lg text-center dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800">Nuevo oficio policial</button>
      </nav>
  );
}

export default NavBar2;
