const { Secuestros, Actas, Vehiculos, Infractores } = require("../db.js");

const axios = require("axios");
require("dotenv").config();

const getActabyNro = async (nro) => {
  try {
    const acta = await Actas.findOne({
      where: { nro },
      include: { model: Secuestros, as: "Secuestro" },
      order: [["id", "DESC"]],
    });

    if (!acta || !acta.Secuestro) {
      return;
    }

    const secuestroId = acta.Secuestro.id;

    return secuestroId;
  } catch (error) {
    console.error("Error al buscar el acta", error);
    throw error;
  }
};


const getActasJuzgado = async () => {
  try {

    // Calcular la fecha de hace dos semanas
    const today = new Date();
    const twoWeeksAgo = new Date();
    twoWeeksAgo.setDate(today.getDate() - 14); // Restar 14 días

    // Formatear la fecha como YYYY-MM-DD
    const formattedDate = twoWeeksAgo.toISOString().split("T")[0];

    const response = await axios.get(
      `${process.env.API_JUZGADO_URL}/corralon/secuestro`,
      {
        headers: {
          Authorization: `Bearer ${process.env.SEARCH_ACTAS_TOKEN}`, // Token seguro
        },
        params: {
          type: "pending", //pending trae las secuestro:true
          from: formattedDate
        },
      }
    );

    /* Recibe como parámetros:
type: Puede ser “pending” o “all”, pending son todas las actas sin ingreso, all son todas las actas con secuestro
from: YYYY-MM-DD (OPCIONAL), si se manda este parámetro, filtra por actas con fecha más reciente de la indicada.
page: INT (OPCIONAL) default 1, sirve para páginas los elementos
limit: INT (OPCIONAL) default 1000 sirve para paginar los elementos, indica de a cuantos se trae por página
nroActa:  (OPCIONAL) valor numero, nro de acta a buscar (puede traer más de 1 acta) */

    return response.data;
  } catch (error) {
    console.error("Error al obtener actas:", error.message);
    throw new Error("No se pudo obtener la información de actas de juzgado.");
  }
};


const getDetailActaJuzgado = async (nroActa) => {
  try {
    const {data} = await axios.get(
      `${process.env.API_JUZGADO_URL}/corralon/secuestro`,
      {
        headers: {
          Authorization: `Bearer ${process.env.SEARCH_ACTAS_TOKEN}`, // Token seguro
        },
        params: {
          type: "all",
          nroActa: nroActa
        },
      }
    );

    return  data;
  } catch (error) {
    console.error("Error al obtener el acta:", error.response.data);
    if (error.response.status === 404) {
      throw new Error("No se encontró el acta.");
    }  }
};

const consultarCompactacionJuzgado = async (nroActa, lugar) => {
  try {
    const response = await axios.get(
      `${process.env.API_JUZGADO_URL}/corralon/secuestro/acta/${nroActa}`,
      {
        headers: {
          Authorization: `Bearer ${process.env.SEARCH_ACTAS_TOKEN}`,
        },
        params: {
          lugar: lugar,
        },
      }
    );
    
    const compactar = response.data?.compactar;

    if (compactar === false) {
      return false;
    } else {
      return true;
    }
  } catch (error) {
    console.error("Error al obtener detalles de Juzgado", error.message);
    return true; // Ante error, se permite compactar
  }
};

module.exports = { consultarCompactacionJuzgado, getActabyNro, getActasJuzgado, getDetailActaJuzgado };
