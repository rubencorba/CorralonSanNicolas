const { Secuestros, Vehiculos,Infractores } = require("../db.js");

const postSecuestro = async (
  infractorCuil,
  infractorDni,
  vehiculoDominio,
  vehiculoMarca,
  vehiculoModelo,
  infractorNombre,
  infractorSexo,
  vehiculoTipo,
  fecha_hora,
  nroInventario,
  sector,
  foto
) => {
  const ingreso = "2345";

  var fechaTimestamp = new Date(fecha_hora).getTime();

  try {
    const newSecuestro = await Secuestros.create({
      ingreso,
      foto,
      fecha_hora: fechaTimestamp,
      inventario: nroInventario,
      sector,
    });
  
    const newVehiculo = await Vehiculos.create({
      marcavh: vehiculoMarca,
      modelovh: vehiculoModelo,
      tipovh: vehiculoTipo,
      dominio: vehiculoDominio,
    });
  
    const newInfractor = await Infractores.create({
      dni: infractorDni,
      nombreCompleto: infractorNombre,
      sexo: infractorSexo,
      cuil: infractorCuil,
    });
    console.log(Object.keys(newSecuestro.__proto__));
    await newSecuestro.setVehiculo(newVehiculo);
    await newSecuestro.setInfractore(newInfractor);
  
    return newSecuestro;
  } catch (error) {
    console.error("Error al crear un nuevo secuestro:", error.message);
    throw new Error("Error al crear un nuevo secuestro en la base de datos.");
  }
};

module.exports = { postSecuestro };
