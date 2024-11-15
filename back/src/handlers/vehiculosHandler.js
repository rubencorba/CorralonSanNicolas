const {getAllVehiculos}=require('../controllers/getAllVehiculos')

const getAllVehiculosHandler= async (req,res)=>{
    const response=await getAllVehiculos();
    res.status(200).json(response);
}

module.exports={getAllVehiculosHandler};