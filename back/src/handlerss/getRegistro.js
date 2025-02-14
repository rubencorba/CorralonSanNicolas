const { Secuestros, Actas, Vehiculos, Users } = require("../db.js");
const { Op } = require("sequelize");

const getRegistro = async (
  compactados,
  egresados,
  ingresados,
  sector,
  user,
  startDate,
  endDate
) => {
  try {
    let whereCondition = {};

    // Construcción dinámica del filtro
    const conditions = [];

    if (ingresados=== "true") {
      console.log("entra")
      conditions.push({
        ingreso: { [Op.not]: null },
        egreso: null,
        compactado: null,
      });
    }
    if (egresados=== "true") {
      conditions.push({ egreso: { [Op.not]: null } });
    }
    if (compactados=== "true") {
      conditions.push({ compactado: { [Op.not]: null } });
    }

    // Si hay más de un filtro, usar Op.or para traer los que cumplan con al menos uno de ellos
    if (conditions.length > 0) {
      whereCondition = { [Op.or]: conditions };
    }

    // Filtro por sector
    if (sector && sector !== "todos") {
      whereCondition.sector = sector; // Filtra por el sector específico
    }

    // Filtro por usuario
    if (user && user !== "todos") {
      whereCondition.usuario = user; // Filtra por el usuario específico
    }

    // Convertir startDate y endDate a timestamps en milisegundos
    const convertToTimestamp = (dateString) => {
      return new Date(dateString).getTime();
    };

    const startTimestamp = startDate ? convertToTimestamp(startDate) : null;
    const endTimestamp = endDate
      ? convertToTimestamp(endDate) + 86399999
      : null; // Sumar casi un día para incluir todo el día

    // Filtro por fecha (rango entre startTimestamp y endTimestamp)
    if (startTimestamp && endTimestamp) {
      whereCondition.fecha_hora = {
        [Op.between]: [startTimestamp, endTimestamp],
      };
    } else if (startTimestamp) {
      whereCondition.fecha_hora = { [Op.gte]: startTimestamp };
    } else if (endTimestamp) {
      whereCondition.fecha_hora = { [Op.lte]: endTimestamp };
    }



    const secuestros = await Secuestros.findAll({
      where: whereCondition, // Aplica el filtro
      order: [["id", "DESC"]], // Orden descendente por 'id'
      include: [
        {
          model: Actas,
          attributes: ["nro"],
        },
        {
          model: Vehiculos,
          attributes: ["dominio"],
        },
        {
          model: Users,
          attributes: ["nombreCompleto"],
        },
      ],
    });
    return secuestros;
  } catch (error) {
    console.error("Error fetching registros:", error.message); // Log para depuración
    throw new Error(
      "No se pudieron obtener los registros. Inténtalo de nuevo más tarde."
    ); // Lanza un error personalizado
  }
};

module.exports = { getRegistro };
