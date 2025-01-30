const { Users } = require("../db.js");
const bcrypt = require("bcryptjs");


const updateContrasena = async (contrasena,id) => {
  try {
    const userUpdate = await Users.findByPk(id);

    if (!userUpdate) {
      throw new Error(`El user con id ${id} no existe en la base de datos.`);
    }

    // Encriptar la contraseña antes de almacenarla
    const hashedPassword = await bcrypt.hash(contrasena, 10);

    // Actualizar la contraseña del usuario
    await userUpdate.update({ contrasena: hashedPassword });

    // Recargar el modelo para asegurarse de que contiene los últimos datos
    await userUpdate.reload();

    return userUpdate;
  } catch (error) {
    throw new Error(`Error al actualizar la contraseña: ${error.message}`);
  }
};

module.exports = {updateContrasena};
