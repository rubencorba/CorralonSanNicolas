const { Egresos,Users, Secuestros } = require("../db.js");

const postEgreso = async (
  bPago,
  dni,
  domicilio,
  fecha_hora,
  licencia,
  nombreCompleto,
  obs,
  tarjetaVerde,
  firma,
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
      firma,
    });

    const user =await Users.findOne({where:{id:userId}})

    await newEgreso.setUser(user);

    // Actualizar el secuestro con el nuevo id de egreso
    await Secuestros.update(
      { egreso: newEgreso.id }, // Actualizar la columna egreso con el nuevo id
      { where: { id: idSecuestro } } // Filtrar por el id del secuestro correspondiente
    );

    return newEgreso;
  } catch (error) {
    console.error("Error al crear un nuevo egreso:", error.message);
    throw new Error("Error al crear un nuevo egreso en la base de datos.");
  }
};

module.exports = { postEgreso };
