const {
  Secuestros,
  Vehiculos,
  Infractores,
  Actas,
  Infracciones,
  Secuestros_infracciones,
  Users
} = require("../db.js");

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
  infracciones,
  userId
) => {
  const ingreso = "2345"; // Luego cambiar esto por el correcto manejo de "ingreso"

  var fechaTimestamp = new Date(fecha_hora).getTime();

  const actaDate = actaFecha_hora
    ? new Date(actaFecha_hora.replace(" ", "T")).getTime()
    : null;

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

    const user =await Users.findOne({where:{id:userId}})

    // Si los datos del acta están presentes, crear el acta y vincularla
    if (actaNro || actaInspector || actaLugar || actaDate) {
      const newActa = await Actas.create({
        nro: actaNro,
        inspector: actaInspector,
        lugar: actaLugar,
        fecha_hora: actaDate,
      });

      await newSecuestro.setActa(newActa);
    }
    /* console.log(Object.keys(newSecuestro.__proto__)); */ //Esto es para visualizar las funciones de newSecuestro

    await newSecuestro.setVehiculo(newVehiculo);
    await newSecuestro.setInfractore(newInfractor);
    await newSecuestro.setUser(user);

    //Esta función se creó para los casos en los que la infracción ingresada desde juzgado
    //no coincide 100% con la de la db de corralón en cuanto a la textualidad.
    //Por lo que si el digesto, y dos palabras de la decrip coinciden, ya se creará el vínculo
    const findMatchingInfraccion = async (descrip, digesto) => {
      const allInfracciones = await Infracciones.findAll({
        where: { digesto },
      });

      for (const infraccion of allInfracciones) {
        const dbWords = infraccion.descrip.split(/\s+/);
        const inputWords = descrip.split(/\s+/);

        const commonWords = dbWords.filter((word) => inputWords.includes(word));
        if (commonWords.length >= 2) {
          return infraccion; // Coincidencia aceptable encontrada
        }
      }

      return null; // No se encontró coincidencia
    };

    // Vincular infracciones
    for (const infraccion of infracciones) {
      let infraccionId;

      // Verificar si el objeto infracción ya tiene un ID 
      // (Caso Ingreso policial, por ingreso de acta no traen id)
      if (infraccion.id) {
        infraccionId = infraccion.id;
      } else {
        // Buscar la infracción coincidente al no ser un ingreso policial
        const matchingInfraccion = await findMatchingInfraccion(
          infraccion.descrip,
          infraccion.digesto
        );

        if (matchingInfraccion) {
          infraccionId = matchingInfraccion.id;
        } else {
          console.warn(
            `Infracción no encontrada o no cumple el umbral: ${infraccion.descrip}, ${infraccion.digesto}.
           Se vinculará con INFRACCION NO TABULADA`
          );
          infraccionId = 864; // ID de "INFRACCION NO TABULADA"
        }
      }

      // Crear la relación en la tabla Secuestros_infracciones
      await Secuestros_infracciones.create({
        secuestro_id: newSecuestro.id,
        infraccion_id: infraccionId,
      });
    }

    return newSecuestro;
  } catch (error) {
    console.error("Error al crear un nuevo secuestro:", error.message);
    throw new Error("Error al crear un nuevo secuestro en la base de datos.");
  }
};

module.exports = { postSecuestro };
