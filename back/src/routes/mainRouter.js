const { Router } = require("express");


const vehiculosRouter=require('./vehiculosRouter');
const secuestrosRouter = require("./secuestrosRouter");
const infraccionesRouter = require("./infraccionesRouter");
const actasRouter = require("./actasRouter");
const usersRouter = require("./usersRouter");
const egresosRouter = require("./egresosRouter");


const router = Router();

router.use('/vehiculos',vehiculosRouter)
router.use('/secuestros',secuestrosRouter)
router.use('/infracciones',infraccionesRouter)
router.use('/actas',actasRouter)
router.use('/users',usersRouter)
router.use('/egresos',egresosRouter)



module.exports = router;
