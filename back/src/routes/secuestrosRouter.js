const { Router } = require("express");

const secuestrosRouter = Router();

const {
  getAllSecuestrosController,
  getDetailSecuestroController,
  postSecuestroController,
  validateUniqueInventarioController,
} = require("../controllers/secuestrosController");

secuestrosRouter.get("/inventario/:nroInventario", validateUniqueInventarioController);
secuestrosRouter.get("/:id", getDetailSecuestroController);
secuestrosRouter.post("/", postSecuestroController);
secuestrosRouter.get("/", getAllSecuestrosController);
/* tramitesRouter.post('/',postTramiteHandler)
tramitesRouter.put('/',putTramiteHandler) */

module.exports = secuestrosRouter;
