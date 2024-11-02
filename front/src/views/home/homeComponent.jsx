import CardsComponent from '../../components/cardsComponent/cardsComponent';
import Navbar from '../../components/navbar/navbarComponent';
import NavBar2 from '../../components/navBar2/navBar2';

import nuevoTramiteLogo from './NuevoTramite.jpg'
import { useNavigate } from 'react-router-dom';

function Home() {

  const navigate = useNavigate();

  const navegar = () =>{
    navigate('/create')
  }

  return (
    <div>
      <Navbar></Navbar>
      <NavBar2/>
      {/* <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
        <div>agergge</div>
        <div>ergerg</div>
        <div>ergserh</div>
        <div>ehrrhrh</div>
      </div> */}
      <CardsComponent></CardsComponent>
    </div>
  );
}

export default Home;