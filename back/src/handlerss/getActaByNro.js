const { Secuestros, Actas, Vehiculos, Infractores } = require("../db.js");
const { infraccionesBySecuestroId } = require("./infraccionesBySecuestroId.js");

const getActabyNro = async (nro) => {
  try {
    // Buscar el acta y el secuestro relacionado
    const acta = await Actas.findOne({
      where: { nro },
      include: { model: Secuestros, as: "Secuestro" },
    });

    if (!acta) {
      return/*  { error: "Acta no encontrada" } */;
    }

    // Obtener los ID del secuestro
    /* const vehiculoId = acta.Secuestro.vehiculo;
    const infractorId = acta.Secuestro.infractor; */
    const secuestroId = acta.Secuestro.id;

    // Buscar los campos relacionados
    /* const vehiculo = await Vehiculos.findOne({ where: { id: vehiculoId } });
    const infractor = await Infractores.findOne({ where: { id: infractorId } });
    const infracciones = await infraccionesBySecuestroId(secuestroId) */

    // Retornar un objeto que incluya todo
    return secuestroId/* { acta, vehiculo,infractor, infracciones } */;
  } catch (error) {
    console.error("Error al buscar el acta", error);
    throw error;
  }
};

module.exports = { getActabyNro };
