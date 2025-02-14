const { Secuestros } = require("../db.js");

const updateFoto = async (foto, id) => {
  try {
    const secuestroUpdate = await Secuestros.findByPk(id);

    if (!secuestroUpdate) {
      throw new Error(
        `El secuestro con id ${id} no existe en la base de datos.`
      );
    }

    // Actualizar la foto del secuestro
    await secuestroUpdate.update({ foto: foto });

    // Recargar el modelo para asegurarse de que contiene los últimos datos
    await secuestroUpdate.reload();

    return secuestroUpdate;
  } catch (error) {
    throw new Error(`Error al actualizar la foto: ${error.message}`);
  }
};

module.exports = { updateFoto };
