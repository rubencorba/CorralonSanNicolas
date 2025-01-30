const { login } = require("../handlerss/login");

const loginController = async (req, res) => {
  const { contrasena, dni } = req.body;

  try {
    const token = await login(contrasena, dni);
    res.status(200).json(token);
  } catch (error) {
    console.error("Error en loginController:", error.message);
    res.status(400).json({ error: error.message });
  }
};

module.exports = {
    loginController,
};
