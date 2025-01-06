const {Secuestros,Vehiculos}= require('../db.js');

const postSecuestro = async(cuil,dni,dominio,/* infracciones, */marcavh,modelovh,nombreCompleto,sexo,tipovh,fecha_hora,inventario,sector,foto) =>{
    const ingreso='2345'
    
    var fechaTimestamp = new Date(fecha_hora).getTime();

    const newSecuestro= await Secuestros.create({ingreso,foto,fecha_hora:fechaTimestamp,inventario,sector});
    const newVehiculo = await Vehiculos.create({ marcavh,modelovh,tipovh, dominio });
    /* cuil,dni,dominio, *//* infracciones, */
    await newSecuestro.setVehiculo(newVehiculo);
    /* console.log(cuil,dni,dominio,infracciones,marcavh,modelovh,nombreCompleto,sexo,tipovh,fecha_hora,inventario,sector) */

    return newSecuestro;
    
}


module.exports={postSecuestro}