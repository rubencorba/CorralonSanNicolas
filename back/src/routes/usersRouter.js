const { Router } = require("express");
const verificarToken = require("../../authMiddleware");

const usersRouter = Router();

const {
  postUserController,
  getAllUsersController,
  updateContrasenaController,
  updateTipoController,
} = require("../controllers/usersController");
const { loginController } = require("../controllers/loginController");

// Ruta abierta (no necesita token) para el login
usersRouter.post("/login", loginController);

usersRouter.use(verificarToken);

// Rutas protegidas
usersRouter.post("/", postUserController); 
usersRouter.get("/", getAllUsersController);
usersRouter.put("/", updateContrasenaController);
usersRouter.put("/tipo", updateTipoController);

module.exports = usersRouter;
