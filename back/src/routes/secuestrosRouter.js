const { Router } = require("express");
const verificarToken = require("../../authMiddleware");

const secuestrosRouter = Router();

const {
  getAllSecuestrosController,
  getDetailSecuestroController,
  postSecuestroController,
  validateUniqueInventarioController,
  updateSectorController,
} = require("../controllers/secuestrosController");

// Aplica verificarToken a todas las rutas de este router
secuestrosRouter.use(verificarToken);

secuestrosRouter.get("/", getAllSecuestrosController); 
secuestrosRouter.get("/inventario/:nroInventario", validateUniqueInventarioController);
secuestrosRouter.get("/:id", getDetailSecuestroController);
secuestrosRouter.post("/", postSecuestroController);
secuestrosRouter.put("/", updateSectorController);

module.exports = secuestrosRouter;



/* const { Router } = require("express");

const secuestrosRouter = Router();

const {
  getAllSecuestrosController,
  getDetailSecuestroController,
  postSecuestroController,
  validateUniqueInventarioController,
  updateSectorController,
} = require("../controllers/secuestrosController");

secuestrosRouter.get("/inventario/:nroInventario", validateUniqueInventarioController);
secuestrosRouter.get("/:id", getDetailSecuestroController);
secuestrosRouter.post("/", postSecuestroController);
secuestrosRouter.get("/", getAllSecuestrosController);
secuestrosRouter.put("/", updateSectorController);


module.exports = secuestrosRouter; */
