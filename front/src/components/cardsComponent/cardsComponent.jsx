import { useEffect, useState } from "react";
import vehiculosSecuestrados from "../../utils/vehiculos";
import CardComponent from "../cardComponent/cardComponent";
import { useSelector } from "react-redux";


function CardsComponent() {

  const currentPagina= useSelector((state)=>state.pagina);

  const [vehiculosAmostrar, setVehiculosAmostrar]= useState([]);

  //Recorto los 10 primeros vehiculos del total, en cuanto se monta el componente
  useEffect(() => {
    
    setVehiculosAmostrar([...vehiculosSecuestrados].splice(0, 3));
    
  }, []);
  useEffect(() => {
    if (currentPagina==1) setVehiculosAmostrar([...vehiculosSecuestrados].splice(0, 3));
    else {
      const elementoInicial= (currentPagina-1)*3
      const elementoFinal= elementoInicial+3
      setVehiculosAmostrar([...vehiculosSecuestrados].splice(elementoInicial, 3));
    }
    
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
          />
       })
      }
       
        
      </div>
    );
  }
  
  export default CardsComponent;