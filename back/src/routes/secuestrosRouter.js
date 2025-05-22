const { Router } = require("express");
const verificarToken = require("../../authMiddleware");

const multer = require("multer");
const upload = multer();

const secuestrosRouter = Router();

const {
  getAllSecuestrosController,
  getDetailSecuestroController,
  postSecuestroController,
  validateUniqueInventarioController,
  updateSectorController,
  getRegistroController,
  updateFotoController,
  updateEstadoController,
  getSecuestrosPorEstadoController,
  getSecuestroPorNroActaController,
  getTotalSecuestrosController,
  getAcompactarController,
  getLevantamientosController,
  getIdSecuestroByActaController,
  getAllIngresadosController,
  updateEstadoDesconocidoController,
  updateAcompactarController,
  updateCompactadosController,
} = require("../controllers/secuestrosController");

// Aplica verificarToken a todas las rutas de este router
secuestrosRouter.use(verificarToken);

secuestrosRouter.get("/inventario/:nroInventario", validateUniqueInventarioController);
secuestrosRouter.get("/a_compactar", getAcompactarController); 
secuestrosRouter.get("/levantamientos", getLevantamientosController); 
secuestrosRouter.get("/registro", getRegistroController); 
secuestrosRouter.get("/total", getTotalSecuestrosController); 
secuestrosRouter.get("/:id", getDetailSecuestroController);
secuestrosRouter.post("/", upload.single("foto"), postSecuestroController);
secuestrosRouter.put("/foto", upload.single("foto"), updateFotoController);
secuestrosRouter.put("/estado", updateEstadoController);
secuestrosRouter.put("/stockActual", updateEstadoDesconocidoController);
secuestrosRouter.put("/aCompactar", updateAcompactarController);
secuestrosRouter.put("/compactados", updateCompactadosController);
secuestrosRouter.put("/", updateSectorController);
secuestrosRouter.get("/compactaciones/:estado", getSecuestrosPorEstadoController); 
secuestrosRouter.get("/nroActa/:nroActa", getSecuestroPorNroActaController);
secuestrosRouter.get("/id/:nroActa", getIdSecuestroByActaController);
secuestrosRouter.get("/ingresados/:meses", getAllIngresadosController);
secuestrosRouter.get("/", getAllSecuestrosController); 


module.exports = secuestrosRouter;
