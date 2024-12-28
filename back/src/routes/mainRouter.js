const { Router } = require("express");


const vehiculosRouter=require('./vehiculosRouter');
const secuestrosRouter = require("./secuestrosRouter");
const infraccionesRouter = require("./infraccionesRouter");


const router = Router();

router.use('/vehiculos',vehiculosRouter)
router.use('/secuestros',secuestrosRouter)
router.use('/infracciones',infraccionesRouter)



module.exports = router;
