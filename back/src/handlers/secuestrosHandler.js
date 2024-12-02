const {getAllSecuestros}=require('../controllers/getAllSecuestros');
const { infraccionesBySecuestroId } = require('../controllers/infraccionesBySecuestroId');
const { secuestroDetailById } = require('../controllers/secuestroDetailById');

const getAllSecuestrosHandler= async (req,res)=>{
    const {page = 1} =req.query

    const options={
        limit: 9,
        offset: (page-1)*9
    }

    const response=await getAllSecuestros(options);
    res.status(200).json(response);
}
const getDetailSecuestroHandler= async (req,res)=>{
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

module.exports={
    getAllSecuestrosHandler,
    getDetailSecuestroHandler
    };