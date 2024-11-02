import CardComponent from "../cardComponent/cardComponent";

function CardsComponent() {

    const array=["awrgreg","ergrg","ergrg","regerg"]
    return (
      <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
       
       {/* {array.map((vehiculo, index) => ( 
        <div> {vehiculo}</div>
       ))}   */}      
       <CardComponent></CardComponent>
       <CardComponent></CardComponent>
       <CardComponent></CardComponent>
       <CardComponent></CardComponent>
      </div>
    );
  }
  
  export default CardsComponent;