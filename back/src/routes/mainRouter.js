const { Router } = require("express");


const vehiculosRouter=require('./vehiculosRouter');


const router = Router();

router.use('/vehiculos',vehiculosRouter)



module.exports = router;
