const { Router } = require("express");
const verificarToken = require("../../authMiddleware");

const usersRouter = Router();

const {
  postUserController,
  getAllUsersController,
  updateContrasenaController,
} = require("../controllers/usersController");
const { loginController } = require("../controllers/loginController");

// Ruta abierta (no necesita token) para el login
usersRouter.post("/login", loginController);

// Middleware para proteger las demás rutas (solo usuarios autenticados pueden acceder)
usersRouter.use(verificarToken);

// Rutas protegidas
usersRouter.post("/", postUserController); // Solo usuarios autorizados pueden registrar nuevos usuarios
usersRouter.get("/", getAllUsersController); // Obtener todos los usuarios
usersRouter.put("/", updateContrasenaController); // Actualizar contraseña de usuario

module.exports = usersRouter;
