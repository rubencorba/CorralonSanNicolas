const { Router } = require("express");

const secuestrosRouter = Router();

const {getAllSecuestrosHandler}=require ('../handlers/secuestrosHandler'); 
const {getDetailSecuestroHandler}=require ('../handlers/secuestrosHandler'); 


secuestrosRouter.get('/',getAllSecuestrosHandler)
secuestrosRouter.get('/:id',getDetailSecuestroHandler)
/* tramitesRouter.post('/',postTramiteHandler)
tramitesRouter.put('/',putTramiteHandler) */

module.exports= secuestrosRouter;