const { Router } = require("express");
const verificarToken = require("../../authMiddleware");

const actasRouter = Router();

const { getActabyNroController } = require("../controllers/actasController");

// Aplica verificarToken a todas las rutas de actasRouter
actasRouter.use(verificarToken);

actasRouter.get("/:nro", getActabyNroController);

module.exports = actasRouter;
