const { Router } = require("express");

const secuestrosRouter = Router();

const {getAllSecuestrosHandler}=require ('../handlers/secuestrosHandler'); 


secuestrosRouter.get('/',getAllSecuestrosHandler)
/* tramitesRouter.post('/',postTramiteHandler)
tramitesRouter.put('/',putTramiteHandler) */

module.exports= secuestrosRouter;