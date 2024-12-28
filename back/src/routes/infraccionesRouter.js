const { Router } = require("express");

const infraccionesRouter = Router();


const { getAllInfraccionesController } = require("../controllers/infraccionesController");


infraccionesRouter.get('/',getAllInfraccionesController)
/* infraccionesRouter.get('/:id',getDetailSecuestroController) */
/* tramitesRouter.post('/',postTramiteHandler)
tramitesRouter.put('/',putTramiteHandler) */

module.exports= infraccionesRouter;