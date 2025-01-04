const { getActabyNro } = require("../handlerss/getActaByNro");


const getActabyNroController= async (req,res)=>{
    const {nro}=req.params;

    const response=await getActabyNro(nro);
    res.status(200).json(response);
}

module.exports={getActabyNroController};