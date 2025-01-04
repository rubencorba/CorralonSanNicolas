const { Router } = require("express");

const actasRouter = Router();


const { getActabyNroController } = require("../controllers/actasController");


actasRouter.get('/:nro',getActabyNroController)
/* infraccionesRouter.get('/:id',getDetailSecuestroController) */
/* tramitesRouter.post('/',postTramiteHandler)
tramitesRouter.put('/',putTramiteHandler) */

module.exports= actasRouter;