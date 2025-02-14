const { Router } = require("express");
const verificarToken = require("../../authMiddleware");

const secuestrosRouter = Router();

const {
  getAllSecuestrosController,
  getDetailSecuestroController,
  postSecuestroController,
  validateUniqueInventarioController,
  updateSectorController,
  getRegistroController,
  updateFotoController,
} = require("../controllers/secuestrosController");

// Aplica verificarToken a todas las rutas de este router
secuestrosRouter.use(verificarToken);

secuestrosRouter.get("/inventario/:nroInventario", validateUniqueInventarioController);
secuestrosRouter.get("/registro", getRegistroController); 
secuestrosRouter.get("/:id", getDetailSecuestroController);
secuestrosRouter.post("/", postSecuestroController);
secuestrosRouter.put("/foto", updateFotoController);
secuestrosRouter.put("/", updateSectorController);
secuestrosRouter.get("/", getAllSecuestrosController); 


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
