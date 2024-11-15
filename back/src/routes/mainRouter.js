const { Router } = require("express");


const vehiculosRouter=require('./vehiculosRouter');
const secuestrosRouter = require("./secuestrosRouter");


const router = Router();

router.use('/vehiculos',vehiculosRouter)
router.use('/secuestros',secuestrosRouter)



module.exports = router;
