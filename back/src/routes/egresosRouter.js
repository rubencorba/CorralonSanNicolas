const { Router } = require("express");
const verificarToken = require("../../authMiddleware");

const multer = require("multer");
const upload = multer();

const egresosRouter = Router();

const { postEgresoController, getEgresoController } = require("../controllers/egresosController");

// Aplica verificarToken a todas las rutas de este router
egresosRouter.use(verificarToken);

/* egresosRouter.post("/", postEgresoController); */
/* egresosRouter.post("/", upload.single("firma"), postEgresoController); */
egresosRouter.post("/", upload.single("firma"), (req, res, next) => {
    console.log("Archivo recibido en multer:", req.file);
    console.log("Body recibido:", req.body);
    next();
  }, postEgresoController);
egresosRouter.get("/:idSecuestro", getEgresoController);



module.exports = egresosRouter;


