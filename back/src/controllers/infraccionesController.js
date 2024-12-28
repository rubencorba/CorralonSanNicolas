const { getAllInfracciones } = require("../handlerss/getAllInfracciones");


const getAllInfraccionesController= async (req,res)=>{
    const response=await getAllInfracciones();
    res.status(200).json(response);
}

module.exports={getAllInfraccionesController};