const {getAllSecuestros}=require('../handlerss/getAllSecuestros');
const { infraccionesBySecuestroId } = require('../handlerss/infraccionesBySecuestroId');
const { postSecuestro } = require('../handlerss/postSecuestro');
const { secuestroDetailById } = require('../handlerss/secuestroDetailById');

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
    const {cuil,dni,dominio,marcavh,modelovh,nombreCompleto,sexo,tipovh,fecha_hora,inventario,sector}=req.body;
    /* infracciones, */
    try {
        const response= await postSecuestro(cuil,dni,dominio,marcavh,modelovh,nombreCompleto,sexo,tipovh,fecha_hora,inventario,sector);
        /* infracciones, */
        res.status(200).json(response);
    } catch (error) {
        res.status(400).json({error:error.message});
    }
}

module.exports={
    getAllSecuestrosController,
    getDetailSecuestroController,
    postSecuestroController
    };