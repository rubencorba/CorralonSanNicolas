import CardsComponent from '../../components/cardsComponent/cardsComponent';
import Navbar from '../../components/navbar/navbarComponent';
import NavBar2 from '../../components/navBar2/navBar2';
import PaginationComponent from '../../components/paginationComponent/paginationComponent';


function Home() {


  return (
    <div className="bg-[#F5FAFF]">
      <Navbar></Navbar>
      <NavBar2/>
      <CardsComponent></CardsComponent>
      <PaginationComponent></PaginationComponent>
    </div>
  );
}

export default Home;