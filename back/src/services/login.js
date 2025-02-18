const { Users } = require("../db.js");
const jwt = require("jsonwebtoken");
const bcrypt = require('bcryptjs');

const login = async (contrasena, dni) => {
    try {
        // Buscar el usuario en la base de datos
        const user = await Users.findOne({where: { dni }});
        if (!user) {
          return { message: "Usuario no encontrado" };
        }
    
        // Verificar la contraseña
        const isPasswordValid = await bcrypt.compare(contrasena, user.contrasena);
        if (!isPasswordValid) {
          return { message: "Contraseña incorrecta" };
        }

        // Generar el token sin tiempo de expiración
        const token = jwt.sign({ id: user._id }, process.env.JWT_SECRET);
    
        // Generar el token con una 1 hora de expiración
        /* const token = jwt.sign({ id: user._id }, process.env.JWT_SECRET, {
          expiresIn: "1h",
        }); */
    
        return {
          token,
          userId: user.id,
          tipo: user.tipo,
        };
      } catch (error) {
        console.error("Error al autenticar al usuario:", error);
      }
}

module.exports = { login };