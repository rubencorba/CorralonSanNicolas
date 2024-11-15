import { useEffect, useState } from "react";
import vehiculosSecuestrados from "../../utils/vehiculos";
import CardComponent from "../cardComponent/cardComponent";
import { useDispatch, useSelector } from "react-redux";
import { getAllVehiculos } from "../../redux/actions";


function CardsComponent() {

  const dispatch=useDispatch()

  const currentPagina= useSelector((state)=>state.pagina);


  /* useEffect(() => {
    
    dispatch(getAllVehiculos())
    
  }, []); */

  const [vehiculosAmostrar, setVehiculosAmostrar]= useState([]);

  //Recorto los 9 primeros vehiculos del total, en cuanto se monta el componente
  useEffect(() => {
    
    const elementoInicial= (currentPagina-1)*9
    const elementoFinal= elementoInicial+3
    setVehiculosAmostrar([...vehiculosSecuestrados].splice(elementoInicial, 9));
    
  }, [currentPagina]);

    
    return (
      <div className="grid grid-cols-2 md:grid-cols-3 gap-4 p-4">
       
       {vehiculosAmostrar.map(({id, tipo, dominio, estado, numeroActa, lugar, fecha, hora}) => {
          return  <CardComponent
          key={id}
          tipo={tipo}
          dominio={dominio}
          estado={estado}
          numeroActa={numeroActa}
          lugar={lugar}
          origin={origin}
          fecha={fecha}
          hora ={hora}
          id ={id}
          />
       })
      }
       
        
      </div>
    );
  }
  
  export default CardsComponent;