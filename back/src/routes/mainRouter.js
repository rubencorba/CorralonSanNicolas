const { Router } = require("express");


const vehiculosRouter=require('./vehiculosRouter');
const secuestrosRouter = require("./secuestrosRouter");
const infraccionesRouter = require("./infraccionesRouter");
const actasRouter = require("./actasRouter");


const router = Router();

router.use('/vehiculos',vehiculosRouter)
router.use('/secuestros',secuestrosRouter)
router.use('/infracciones',infraccionesRouter)
router.use('/actas',actasRouter)



module.exports = router;
