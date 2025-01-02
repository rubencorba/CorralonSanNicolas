const { Router } = require("express");

const secuestrosRouter = Router();


const { getAllSecuestrosController, getDetailSecuestroController, postSecuestroController } = require("../controllers/secuestrosController");


secuestrosRouter.get('/',getAllSecuestrosController)
secuestrosRouter.get('/:id',getDetailSecuestroController)
secuestrosRouter.post('/',postSecuestroController)
/* tramitesRouter.post('/',postTramiteHandler)
tramitesRouter.put('/',putTramiteHandler) */

module.exports= secuestrosRouter;