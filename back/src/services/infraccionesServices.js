const {Infracciones}= require('../db.js');

const getAllInfracciones =async()=> await Infracciones.findAll()


module.exports={getAllInfracciones}