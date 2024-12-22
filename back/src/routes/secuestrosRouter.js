const { Router } = require("express");

const secuestrosRouter = Router();


const { getAllSecuestrosController, getDetailSecuestroController } = require("../controllers/secuestrosController");


secuestrosRouter.get('/',getAllSecuestrosController)
secuestrosRouter.get('/:id',getDetailSecuestroController)
/* tramitesRouter.post('/',postTramiteHandler)
tramitesRouter.put('/',putTramiteHandler) */

module.exports= secuestrosRouter;