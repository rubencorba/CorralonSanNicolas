import {Route,Routes} from "react-router-dom";

import './App.css';

import Home from './views/home/homeComponent';
import Landing from './views/landing/landingComponent';
import DetailComponent from "./views/detail/detailComponent";
import IngresoComponent from "./views/ingreso/ingresoComponent";
import VehiculosComponent from "./views/vehiculos/vehiculosComponent";
import UsuariosComponent from "./views/usuarios/usuariosComponent";
import CambiarSectorComponent from "./components/cambiarSectorComponent/cambiarSectorComponent";
import FotoComponent from "./views/ingreso/fotoComponent";
import ConfirmarDatos from "./views/ingreso/confirmarDatosComponent";
import IngresoPolicialComponent from "./views/ingreso/ingresoPolicialComponent";
import LeerQRComponent from "./components/leerQRcomponent/leerQR";
import BuscarVehiculoComponent from "./components/buscarVehiculoComponent/buscarVehiculoComponent";
import NuevoUsuarioComponent from "./components/nuevoUsuarioComponent/nuevoUsuarioComponent";
import IngresoDetallesComponent from "./views/ingreso/ingresoDetallesComponent";
import ResetearUsuarioComponent from "./views/usuarios/resetearUsuarioComponent";
import ProtectedRoute from "./components/protectedRoute/protectedRoute";
import LicenciasComponent from "./views/licenciasComponent/licenciasComponent";
import RegistrosComponent from "./components/registrosComponent/registrosComponent";
import OpcionesFotoComponent from "./views/ingreso/opcionesFotoComponent";
import SubirFotoComponent from "./views/ingreso/subirFotoComponent";
import TakeFotoToDetailComponent from "./views/detail/takeFotoToDetailComponent";
import ACompactarComponent from "./components/aCompactarComponent/aCompactarComponent";
import LevantamientosComponent from "./components/levantamientosComponent/levantamientosComponent";
import CompactacionComponent from "./components/compactacionComponent/compactacionComponent";
import StockActualComponent from "./components/stockActual/stockActual";


function App() {
  return (
    <div>
      <Routes>
        <Route path='/salir' element={<Landing/>}/>
        <Route path='/' element={<Landing/>}/>
         {/* Rutas protegidas */}
         <Route
          path='/*'
          element={
            <ProtectedRoute>
              <Routes>
                <Route path='/inicio' element={<Home />} />
                <Route path='/detail/:id' element={<DetailComponent />} />
                <Route path='/take_foto_detail' element={<TakeFotoToDetailComponent />} />
                <Route path='/ingreso' element={<IngresoComponent />} />
                <Route path='/ingreso_policial' element={<IngresoPolicialComponent />} />
                <Route path='/ingreso_detalles' element={<IngresoDetallesComponent />} />
                <Route path='/opciones_ingreso_foto' element={<OpcionesFotoComponent />} />
                <Route path='/ingreso_foto' element={<FotoComponent />} />
                <Route path='/subir_foto' element={<SubirFotoComponent />} />
                <Route path='/ingreso_confirmacion' element={<ConfirmarDatos />} />
                <Route path='/vehiculos' element={<VehiculosComponent />} />
                <Route path='/licencias' element={<LicenciasComponent />} />
                <Route path='/leerQR' element={<LeerQRComponent />} />
                <Route path='/buscar' element={<BuscarVehiculoComponent />} />
                <Route path='/registros' element={<RegistrosComponent />} />
                <Route path='/levantamientos' element={<LevantamientosComponent />} />
                <Route path='/compactacion' element={<CompactacionComponent />} />
                <Route path='/a_compactar' element={<ACompactarComponent />} />
                <Route path='/stock_actual' element={<StockActualComponent />} />
                <Route path='/usuarios' element={<UsuariosComponent />} />
                <Route path='/resetear_usuario' element={<ResetearUsuarioComponent />} />
                <Route path='/nuevo_usuario' element={<NuevoUsuarioComponent />} />
                <Route path='/cambiar_sector' element={<CambiarSectorComponent />} />
              </Routes>
            </ProtectedRoute>
          }
        />
      </Routes>
    </div>
  );
}

export default App;
