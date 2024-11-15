const {Vehiculos}= require('../db.js');

const getAllVehiculos =async()=> await Vehiculos.findAll()


module.exports={getAllVehiculos}