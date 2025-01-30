const { Secuestros, Vehiculos, Infractores } = require("../db.js");
const { infraccionesBySecuestroId } = require("./infraccionesBySecuestroId.js");

const getVehiculoByDominio = async (dominio) => {
  try {
    // Buscar el vehiculo y secuestro en la base de datos
    const vehiculo = await Vehiculos.findOne({
      where: { dominio },
      include: { model: Secuestros, as: "Secuestro" },
    });

    if (!vehiculo) {
        return { message: "No se encontró vehículo con ese dominio" };
    }

    // Obtener los ID del secuestro
    /* const vehiculoId = acta.Secuestro.vehiculo;
    const infractorId = acta.Secuestro.infractor; */
    const secuestroId = vehiculo.Secuestro.id;

    // Buscar los campos relacionados
    /* const vehiculo = await Vehiculos.findOne({ where: { id: vehiculoId } });
    const infractor = await Infractores.findOne({ where: { id: infractorId } });
    const infracciones = await infraccionesBySecuestroId(secuestroId) */

    // Retornar un objeto que incluya todo
    return secuestroId/* { acta, vehiculo,infractor, infracciones } */;
  } catch (error) {
    console.error("Error al buscar el vehiculo", error);
    throw error;
  }
};

module.exports = { getVehiculoByDominio };
