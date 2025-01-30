const { getAllUsers } = require("../handlerss/getAllUsers");
const { postNewUser } = require("../handlerss/postNewUser");
const {updateContrasena} = require("../handlerss/updateContrasena");

const postUserController = async (req, res) => {
  const { nombreCompleto, contrasena, dni, tipo, fecha } = req.body;

  try {
    const token = await postNewUser(nombreCompleto, contrasena, dni, tipo, fecha);
    res.status(201).json({ message: 'Usuario creado con éxito', token });
  } catch (error) {
    console.error("Error en postUserController:", error.message);
    res.status(400).json({ error: error.message });
  }
};

const getAllUsersController = async (req, res) => {

  try {
    
    const response = await getAllUsers();
    res.status(200).json(response);
  } catch (error) {
    console.error("Error en getAllUsersController:", error.message);
    res.status(400).json({ error: error.message });
  }
};
const updateContrasenaController = async (req, res) => {
  const { contrasena, id } = req.body;

  try {
    
    const response = await updateContrasena(contrasena,id);
    res.status(200).json(response);
  } catch (error) {
    console.error("Error en updateContrasenaController:", error.message);
    res.status(400).json({ error: error.message });
  }
};

module.exports = {
  postUserController,
  getAllUsersController,
  updateContrasenaController
};
