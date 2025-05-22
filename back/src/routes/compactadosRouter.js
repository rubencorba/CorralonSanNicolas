const { Router } = require("express");
const verificarToken = require("../../authMiddleware");

const compactadosRouter = Router();

const { postCompactadoController } = require("../controllers/compactadosController");

// Aplica verificarToken a todas las rutas de este router
compactadosRouter.use(verificarToken);

compactadosRouter.post("/", postCompactadoController);



module.exports = compactadosRouter;


