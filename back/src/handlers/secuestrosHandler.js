const {getAllSecuestros}=require('../controllers/getAllSecuestros')

const getAllSecuestrosHandler= async (req,res)=>{
    const response=await getAllSecuestros();
    res.status(200).json(response);
}

module.exports={getAllSecuestrosHandler};