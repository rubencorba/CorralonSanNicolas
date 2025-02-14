const { Router } = require("express");
const verificarToken = require("../../authMiddleware");

const egresosRouter = Router();

const { postEgresoController, getEgresoController } = require("../controllers/egresosController");

// Aplica verificarToken a todas las rutas de este router
egresosRouter.use(verificarToken);

egresosRouter.post("/", postEgresoController);
egresosRouter.get("/:idSecuestro", getEgresoController);



module.exports = egresosRouter;


