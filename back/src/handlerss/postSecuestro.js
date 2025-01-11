const { Secuestros, Vehiculos,Infractores,Actas,Infracciones,Secuestros_infracciones } = require("../db.js");

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
  foto,
  actaNro,
  actaInspector,
  actaLugar,
  actaFecha_hora,
  infracciones
) => {
  const ingreso = "2345";

  var fechaTimestamp = new Date(fecha_hora).getTime();

  const isoDateString = actaFecha_hora.replace(" ", "T");
  const actaDate = new Date(isoDateString).getTime();

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

    const newActa = await Actas.create({
      nro: actaNro,
      inspector: actaInspector,
      lugar: actaLugar,
      fecha_hora: actaDate,
    });
    console.log(Object.keys(newSecuestro.__proto__));
    await newSecuestro.setVehiculo(newVehiculo);
    await newSecuestro.setInfractore(newInfractor);
    await newSecuestro.setActa(newActa);


    const findMatchingInfraccion = async (descrip, digesto) => {
      const allInfracciones = await Infracciones.findAll({
        where: { digesto },
      });
    
      for (const infraccion of allInfracciones) {
        const dbWords = infraccion.descrip.split(/\s+/);
        const inputWords = descrip.split(/\s+/);
    
        const commonWords = dbWords.filter((word) => inputWords.includes(word));
        if (commonWords.length >= 4) {
          return infraccion; // Coincidencia aceptable encontrada
        }
      }
    
      return null; // No se encontró coincidencia
    };

     // Vincular infracciones
     for (const infraccion of infracciones) {
      const matchingInfraccion = await findMatchingInfraccion(
        infraccion.descrip,
        infraccion.digesto
      );

      if (matchingInfraccion) {
        await Secuestros_infracciones.create({
          secuestro_id: newSecuestro.id,
          infraccion_id: matchingInfraccion.id,
        });
      } else {
        console.warn(
          `Infracción no encontrada o no cumple el umbral: ${infraccion.descrip}, ${infraccion.digesto}`
        );
      }
    }

  
    return newSecuestro;
  } catch (error) {
    console.error("Error al crear un nuevo secuestro:", error.message);
    throw new Error("Error al crear un nuevo secuestro en la base de datos.");
  }
};

module.exports = { postSecuestro };
