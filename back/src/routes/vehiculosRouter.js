const { Router } = require("express");

const vehiculosRouter = Router();

const {getAllVehiculosHandler}=require ('../handlers/vehiculosHandler'); 


vehiculosRouter.get('/',getAllVehiculosHandler)
/* tramitesRouter.post('/',postTramiteHandler)
tramitesRouter.put('/',putTramiteHandler) */

module.exports= vehiculosRouter;