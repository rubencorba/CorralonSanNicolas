import {Route,Routes} from "react-router-dom";

import './App.css';
import Create from './views/create/createComponent';
import Home from './views/home/homeComponent';
import Landing from './views/landing/landingComponent';
import DetailComponent from "./views/detail/detailComponent";
import IngresoComponent from "./views/ingreso/ingresoComponent";
import VehiculosComponent from "./views/vehiculos/vehiculosComponent";
import UsuariosComponent from "./views/usuarios/usuariosComponent";
import CambiarSectorComponent from "./components/cambiarSectorComponent/cambiarSectorComponent";
import DetallesComponent from "./views/ingreso/detallesComponent";
import FotoComponent from "./views/ingreso/fotoComponent";
import ConfirmarDatos from "./views/ingreso/confirmarDatosComponent";
import IngresoPolicialComponent from "./views/ingreso/ingresoPolicialComponent";


function App() {
  return (
    <div>
      <Routes>
        <Route path='/salir' element={<Landing/>}/>
        <Route path='/' element={<Landing/>}/>
        <Route path='/inicio' element={<Home/>}/>
        <Route path='/detail/:id' element={<DetailComponent/>}/> {/* Ruta con los detalles de un vehículo secuestrado */}
        <Route path='/ingreso' element={<IngresoComponent/>}/>
        <Route path='/ingreso_policial' element={<IngresoPolicialComponent/>}/>
        <Route path='/ingreso_detalles' element={<DetallesComponent/>}/> {/* Ruta para insertar detalles de un vehiculo a ingresar */}
        <Route path='/ingreso_foto' element={<FotoComponent/>}/>
        <Route path='/ingreso_confirmacion' element={<ConfirmarDatos/>}/>
        <Route path='/vehiculos' element={<VehiculosComponent/>}/>
        <Route path='/usuarios' element={<UsuariosComponent/>}/>
        <Route path='/cambiar_sector' element={<CambiarSectorComponent/>}/>
        
        
      </Routes>
      
      
    </div>
  );
}

export default App;
