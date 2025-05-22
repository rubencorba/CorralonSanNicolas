const { Router } = require("express");
const verificarToken = require("../../authMiddleware");

const actasRouter = Router();

const { getActabyNroController, getActasJuzgadoController, getDetailActaJuzgadoController, consultarCompactacionController } = require("../controllers/actasController");

// Aplica verificarToken a todas las rutas de actasRouter
actasRouter.use(verificarToken);

actasRouter.get("/detailActaJuzgado/:nroActa", getDetailActaJuzgadoController);
actasRouter.get("/juzgado", getActasJuzgadoController);
actasRouter.get("/consulta", consultarCompactacionController);
actasRouter.get("/:nro", getActabyNroController);

module.exports = actasRouter;
