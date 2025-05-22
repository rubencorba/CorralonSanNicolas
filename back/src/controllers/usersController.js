const { postNewUser, getAllUsers, updateContrasena, updateTipo } = require("../services/usersServices");

const postUserController = async (req, res) => {
  const { nombreCompleto, contrasena, dni, tipo, fecha } = req.body;

  try {
    const result = await postNewUser(nombreCompleto, contrasena, dni, tipo, fecha);
    
    if (result.error) {
      return res.status(400).json({ error: result.error }); // Ahora devuelve un error real
    }

    res.status(200).json({ message: "Usuario creado con éxito", token: result });
  } catch (error) {
    console.error("Error en postUserController:", error.message);
    res.status(500).json({ error: "Error en el servidor al crear el usuario." });
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

const updateTipoController = async (req, res) => {
  const { tipo, id } = req.body;

  try {
    
    const response = await updateTipo(tipo,id);
    res.status(200).json(response);
  } catch (error) {
    console.error("Error en updateTipoController:", error.message);
    res.status(400).json({ error: error.message });
  }
};



module.exports = {
  updateTipoController,
  postUserController,
  getAllUsersController,
  updateContrasenaController,
};
