const { Router } = require("express");
const verificarToken = require("../../authMiddleware");

const vehiculosRouter = Router();

const {
  getVehiculoByDominioController,
  getAllVehiculosController,
} = require("../controllers/vehiculosController");

vehiculosRouter.use(verificarToken);

vehiculosRouter.get("/", getAllVehiculosController);
vehiculosRouter.get("/:dominio", getVehiculoByDominioController);

module.exports = vehiculosRouter;
