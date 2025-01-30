const { Secuestros, Actas, Vehiculos } = require("../db.js");
const { Op } = require('sequelize');

const getAllSecuestros = async ({ limit, offset, filter }) => {
  try {
    let whereCondition = {}; // Inicialmente, sin filtros

    if (filter === "ingresados") {
      whereCondition = {
        ingreso: { [Op.not]: null }, // Todos tienen ingreso, pero aseguramos que no sea null
        egreso: null,
        compactado: null,
      };
    } else if (filter === "egresados") {
      whereCondition = {
        egreso: { [Op.not]: null }, // Solo los que tienen un valor en egreso
      };
    } else if (filter === "compactados") {
      whereCondition = {
        compactado: { [Op.not]: null }, // Solo los que tienen un valor en compactado
      };
    }


    const secuestros = await Secuestros.findAll({
      where: whereCondition, // Aplica el filtro
      limit,
      offset,
      order: [["id", "DESC"]], // Orden descendente por 'id'
      include: [
        {
          model: Actas,
          attributes: ["nro", "lugar"],
        },
        {
          model: Vehiculos,
          attributes: ["tipovh", "dominio"],
        },
      ],
    });
    return secuestros;
  } catch (error) {
    console.error("Error fetching secuestros:", error.message); // Log para depuración
    throw new Error(
      "No se pudieron obtener los secuestros. Inténtalo de nuevo más tarde."
    ); // Lanza un error personalizado
  }
};

module.exports = { getAllSecuestros };
