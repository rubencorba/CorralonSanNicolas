import {Route,Routes} from "react-router-dom";

import './App.css';
import Create from './views/create/createComponent';
import Home from './views/home/homeComponent';
import Landing from './views/landing/landingComponent';
import DetailComponent from "./views/detail/detailComponent";
import IngresoComponent from "./views/ingreso/ingresoComponent";
import VehiculosComponent from "./views/vehiculos/vehiculosComponent";
import UsuariosComponent from "./views/usuarios/usuariosComponent";


function App() {
  return (
    <div>
      <Routes>
        <Route path='/' element={<Landing/>}/>
        <Route path='/home' element={<Home/>}/>
        <Route path='/detail/:id' element={<DetailComponent/>}/>
        <Route path='/ingreso' element={<IngresoComponent/>}/>
        <Route path='/vehiculos' element={<VehiculosComponent/>}/>
        <Route path='/usuarios' element={<UsuariosComponent/>}/>
        
        {/* <Route path='/create' element={<Create/>}/>
        <Route path='/allTramites' element={<AllTramites/>}/>
        <Route path='/allTramitesAprobados' element={<AllTramitesAprobados/>}/>
        <Route path='/allTramitesRechazados' element={<AllTramitesRechazados/>}/>
        <Route path='/allMyTramites' element={<AllMyTramites/>}/> */}
      </Routes>
      
      
    </div>
  );
}

export default App;
