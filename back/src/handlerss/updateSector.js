const { Secuestros } = require("../db.js");

const updateSector = async (sector, id) => {
  try {
    const secuestroUpdate = await Secuestros.findByPk(id);

    if (!secuestroUpdate) {
      throw new Error(
        `El secuestro con id ${id} no existe en la base de datos.`
      );
    }

    // Actualizar el sector del secuestro
    await secuestroUpdate.update({ sector: sector });

    // Recargar el modelo para asegurarse de que contiene los últimos datos
    await secuestroUpdate.reload();

    return secuestroUpdate;
  } catch (error) {
    throw new Error(`Error al actualizar el sector: ${error.message}`);
  }
};

module.exports = { updateSector };
