const {getAllSecuestros}=require('../handlerss/getAllSecuestros');
const { infraccionesBySecuestroId } = require('../handlerss/infraccionesBySecuestroId');
const { postSecuestro } = require('../handlerss/postSecuestro');
const { secuestroDetailById } = require('../handlerss/secuestroDetailById');
const { validateUniqueInventario } = require('../handlerss/validateUniqueInventario');

const getAllSecuestrosController= async (req,res)=>{
    const {page = 1} =req.query

    const options={
        limit: 9,
        offset: (page-1)*9
    }

    const response=await getAllSecuestros(options);
    res.status(200).json(response);
}
const getDetailSecuestroController= async (req,res)=>{
    const {id}=req.params;

    try {
        const response2= await infraccionesBySecuestroId(id)
        let response=await secuestroDetailById(id);

        response = response.toJSON();

        response.infracciones=response2
        res.status(200).json(response);
    } catch (error) {
        res.status(400).json({error:error.message});
    }
}
const postSecuestroController= async (req,res)=>{
    const {infractorCuil,infractorDni,vehiculoDominio,vehiculoMarca,vehiculoModelo,infractorNombre,infractorSexo,vehiculoTipo,fecha_hora,nroInventario,sector,foto}=req.body;
    /* infracciones, */
    try {
        const response= await postSecuestro(infractorCuil,infractorDni,vehiculoDominio,vehiculoMarca,vehiculoModelo,infractorNombre,infractorSexo,vehiculoTipo,fecha_hora,nroInventario,sector,foto);
        /* infracciones, */
        res.status(200).json(response);
    } catch (error) {
        res.status(400).json({error:error.message});
    }
}
const validateUniqueInventarioController= async (req,res)=>{
    const {nroInventario}=req.params;

    try {
        const response= await validateUniqueInventario(nroInventario)

        res.status(200).json(response);
    } catch (error) {
        res.status(400).json({error:error.message});
    }
}

module.exports={
    getAllSecuestrosController,
    getDetailSecuestroController,
    postSecuestroController,
    validateUniqueInventarioController
    };