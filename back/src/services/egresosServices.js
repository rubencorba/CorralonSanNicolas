const { Egresos,Users, Secuestros } = require("../db.js");
const axios = require("axios");
require("dotenv").config();

const postEgreso = async (
  bPago,
  dni,
  domicilio,
  fecha_hora,
  licencia,
  nombreCompleto,
  obs,
  tarjetaVerde,
  firmaUrl,
  userId,
  idSecuestro
) => {
  try {

    // Si un campo INT llega vacío, se convierte a null
    const parsedBPago = bPago === "" ? null : bPago;
    const parsedLicencia = licencia === "" ? null : licencia;

    var fechaTimestamp = new Date(fecha_hora).getTime();

    const newEgreso = await Egresos.create({
      bPago: parsedBPago,
      dni,
      domicilio,
      fecha_hora: fechaTimestamp,
      licencia: parsedLicencia,
      nombreCompleto,
      obs,
      tarjetaVerde,
      firma:firmaUrl,
    });

    const user =await Users.findOne({where:{id:userId}})

    await newEgreso.setUser(user);

    // Actualizar el secuestro con el nuevo id de egreso
    await Secuestros.update(
      { egreso: newEgreso.id, // Actualizar la columna egreso con el nuevo id
        estado: "Egresado" // Actualizar el estado del secuestro
       }, // Actualizar la columna egreso con el nuevo id
      { where: { id: idSecuestro } } // Filtrar por el id del secuestro correspondiente
    );

    return newEgreso;
  } catch (error) {
    console.error("Error al crear un nuevo egreso:", error.message);
    throw new Error("Error al crear un nuevo egreso en la base de datos.");
  }
};


const notificateEgresoToJuzgado = async (userId, idLevantamiento) => {
  try {

    const user = await Users.findOne({ where: { id: userId } });

    if (!user) {
      throw new Error(`No se encontró el usuario con ID: ${userId}`);
    }

    const response = await axios.put(
      `${process.env.API_JUZGADO_URL}/corralon/levantamiento/${idLevantamiento}`,
      new URLSearchParams({ user: user.dni }).toString(), // Formato x-www-form-urlencoded
      {
        headers: {
          "Content-Type": "application/x-www-form-urlencoded",
          Authorization: `Bearer ${process.env.SEARCH_ACTAS_TOKEN}`,
        },
      }
    );

    return response.data;
  } catch (error) {
    console.error("Error al notificar egreso a Juzgado", error.message);
    throw new Error("Error al llamar al endpoint de juzgado para notificar el egreso.");
  }
};



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

module.exports = { postEgreso, getEgreso, notificateEgresoToJuzgado };
