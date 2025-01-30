const { Router } = require("express");
const verificarToken = require("../../authMiddleware");

const infraccionesRouter = Router();

const { getAllInfraccionesController } = require("../controllers/infraccionesController");

// Aplica verificarToken a todas las rutas de infraccionesRouter
infraccionesRouter.use(verificarToken);

infraccionesRouter.get("/", getAllInfraccionesController);

module.exports = infraccionesRouter;