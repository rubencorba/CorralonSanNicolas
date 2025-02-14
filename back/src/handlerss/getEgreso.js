const { Secuestros, Egresos, Users } = require("../db.js");

const getEgreso = async (idSecuestro) => {
  try {
    // Buscar el secuestro con su ID
    const secuestro = await Secuestros.findOne({
      where: { id: idSecuestro },
    });

    // Verificar que el secuestro existe y tiene un egreso
    if (!secuestro || !secuestro.egreso) {
      throw new Error("No se encontró el secuestro o aún no tiene un egreso.");
    }

    // Buscar el egreso e incluir la información del usuario asociado
    const egreso = await Egresos.findOne({
      where: { id: secuestro.egreso },
      include: {
        model: Users,
        attributes: ["nombreCompleto", "dni"], // Solo traemos estos campos
      },
    });

    // Verificar si el egreso existe
    if (!egreso) {
      throw new Error("El egreso asociado no existe.");
    }

    return egreso;
  } catch (error) {
    console.error("Error al obtener el egreso:", error.message);
    throw new Error("Hubo un problema al recuperar la información del egreso.");
  }
};

module.exports = { getEgreso };
