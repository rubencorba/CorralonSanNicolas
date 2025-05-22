const { Router } = require("express");
const verificarToken = require("../../authMiddleware");

const multer = require("multer");
const upload = multer();

const licenciasRouter = Router();

const { getLicenciaController, postLicenciaController, getAllLicenciasController, getTotalLicenciasController, geInfoEgresoController, postEgresoLicenciaController, getLicenciaEgresadaController, updateFotoLicenciaController } = require("../controllers/licenciasController");

// Aplica verificarToken a todas las rutas de este router
licenciasRouter.use(verificarToken);


licenciasRouter.get("/egresada/:idLicencia", getLicenciaEgresadaController);
licenciasRouter.get("/total", getTotalLicenciasController);
licenciasRouter.get("/infoJuzgado/:dni", geInfoEgresoController);
licenciasRouter.get("/:dni", getLicenciaController);
licenciasRouter.post("/egreso", upload.single("firma"), postEgresoLicenciaController);
licenciasRouter.post("/", upload.single("foto"), postLicenciaController);
licenciasRouter.put("/", upload.single("foto"), updateFotoLicenciaController);
licenciasRouter.get("/", getAllLicenciasController);



module.exports = licenciasRouter;


