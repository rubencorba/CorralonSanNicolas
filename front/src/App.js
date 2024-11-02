import {Route,Routes} from "react-router-dom";

import './App.css';
import Create from './views/create/createComponent';
import Home from './views/home/homeComponent';
import Landing from './views/landing/landingComponent';
import AllTramites from "./views/allTramites/allTramites";
import AllMyTramites from "./views/allMyTramites/allMyTramites";
import AllTramitesAprobados from "./views/allTramites/allTramitesAprobados";
import AllTramitesRechazados from "./views/allTramites/allTramitesRechazados";

function App() {
  return (
    <div>
      <Routes>
        <Route path='/' element={<Landing/>}/>
        <Route path='/home' element={<Home/>}/>
        
        <Route path='/create' element={<Create/>}/>
        <Route path='/allTramites' element={<AllTramites/>}/>
        <Route path='/allTramitesAprobados' element={<AllTramitesAprobados/>}/>
        <Route path='/allTramitesRechazados' element={<AllTramitesRechazados/>}/>
        <Route path='/allMyTramites' element={<AllMyTramites/>}/>
      </Routes>
      
      
    </div>
  );
}

export default App;
