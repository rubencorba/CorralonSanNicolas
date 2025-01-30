const { Users } = require("../db.js");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");

const postNewUser = async (nombreCompleto, contrasena, dni, tipo, fecha) => {
  try {
    // Verifica si el usuario ya existe
    const userExists = await Users.findOne({ where: { dni } });
    if (userExists) {
      return { error: "El usuario con ese DNI ya está registrado" };
    }

    // Hashea la contraseña
    const hashedContrasena = await bcrypt.hash(contrasena, 10);

    const newUser = await Users.create({
      nombreCompleto,
      contrasena: hashedContrasena,
      dni,
      tipo,
      fecha,
    });

    // Genera un token JWT
    const token = jwt.sign(
      { id: newUser.id, nombreCompleto, tipo },
      process.env.JWT_SECRET,
      { expiresIn: "1h" }
    );

    return token;
    
  } catch (error) {
    console.error("Error al crear un nuevo usuario:", error.message);
    throw new Error("Error al crear un nuevo usuario en la base de datos.");
  }
};

module.exports = { postNewUser };
