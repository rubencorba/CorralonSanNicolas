import { useEffect, useState } from "react";
/* import vehiculosSecuestrados from "../../utils/vehiculos"; */
import CardComponent from "../cardComponent/cardComponent";
import { useDispatch, useSelector } from "react-redux";
import { getAllSecuestros, getAllVehiculos } from "../../redux/actions";


function CardsComponent() {

  const dispatch=useDispatch()

  const currentPagina= useSelector((state)=>state.pagina);
  const secuestros= useSelector((state)=>state.secuestros);


  useEffect(() => {
    
    dispatch(getAllSecuestros())
    
  }, []);

  const [secuestrosAmostrar, setSecuestrosAmostrar]= useState([]);

  //Recorto los 9 primeros secuestros del total, en cuanto se monta el componente
  useEffect(() => {
    
    const elementoInicial= (currentPagina-1)*9
    const elementoFinal= elementoInicial+3
    setSecuestrosAmostrar([...secuestros].splice(elementoInicial, 9));
    
  }, [currentPagina]);

    
    return (
      <div className="grid grid-cols-1 md:grid-cols-3 sm:grid-cols-2 gap-4 p-4">
       
       {secuestrosAmostrar.map(({id, Vehiculo, egreso_mysql, Acta, fecha_hora, foto}) => {
          return  <CardComponent
          key={id}
          tipo={Vehiculo.tipovh}
          dominio={Vehiculo.dominio}
          egreso={egreso_mysql}
          numeroActa={Acta.nro}
          lugar={Acta.lugar}
          origin={origin}
          fecha_hora={fecha_hora}
          foto={foto}
          id ={id}
          />
       })
      }
      
      </div>
    );
  }
  
  export default CardsComponent;