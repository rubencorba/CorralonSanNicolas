const {Secuestros,Vehiculos}= require('../db.js');

const postSecuestro = async(cuil,dni,dominio,/* infracciones, */marcavh,modelovh,nombreCompleto,sexo,tipovh,/* fecha_hora, */inventario,sector,foto) =>{
    const ingreso='2345'
    const fecha_hora= "1564175390716"
    const newSecuestro= await Secuestros.create({ingreso,foto,fecha_hora,inventario,sector});
    const newVehiculo = await Vehiculos.create({ marcavh,modelovh,tipovh, dominio });
    /* cuil,dni,dominio, *//* infracciones, */
    await newSecuestro.setVehiculo(newVehiculo);
    /* console.log(cuil,dni,dominio,infracciones,marcavh,modelovh,nombreCompleto,sexo,tipovh,fecha_hora,inventario,sector) */

    return newSecuestro;
    
}


module.exports={postSecuestro}