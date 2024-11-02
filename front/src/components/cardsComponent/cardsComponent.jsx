import vehiculosSecuestrados from "../../utils/vehiculos";
import CardComponent from "../cardComponent/cardComponent";


function CardsComponent() {

    
    return (
      <div className="grid grid-cols-2 md:grid-cols-3 gap-4 p-4">
       
       {vehiculosSecuestrados.map(({id, tipo, dominio, estado, numeroActa, lugar, fecha, hora}) => {
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
       
        
              
       {/* <CardComponent></CardComponent>
       <CardComponent></CardComponent>
       <CardComponent></CardComponent>
       <CardComponent></CardComponent> */}
      </div>
    );
  }
  
  export default CardsComponent;