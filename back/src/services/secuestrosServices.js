const { Secuestros, Actas, Vehiculos, Users, Secuestros_infracciones, Infracciones, Infractores } = require("../db.js");
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

        if (ingresados === "true") {
            console.log("entra")
            conditions.push({
                ingreso: { [Op.not]: null },
                egreso: null,
                compactado: null,
            });
        }
        if (egresados === "true") {
            conditions.push({ egreso: { [Op.not]: null } });
        }
        if (compactados === "true") {
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
            whereCondition.user = user; // Filtra por el usuario específico
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



const infraccionesBySecuestroId = async (id) => {
    return await Secuestros_infracciones.findAll({
        where: { secuestro_id: id },
        include: [
            {
                model: Infracciones,
                /* as: 'Actas', */ // Este alias debe coincidir con el definido en tu asociación
                attributes: ['descrip', 'digesto'],
            },

        ],
    });
};


const updateFoto = async (foto, id) => {
    try {
        const secuestroUpdate = await Secuestros.findByPk(id);

        if (!secuestroUpdate) {
            throw new Error(
                `El secuestro con id ${id} no existe en la base de datos.`
            );
        }

        // Actualizar la foto del secuestro
        await secuestroUpdate.update({ foto: foto });

        // Recargar el modelo para asegurarse de que contiene los últimos datos
        await secuestroUpdate.reload();

        return secuestroUpdate;
    } catch (error) {
        throw new Error(`Error al actualizar la foto: ${error.message}`);
    }
};


const updateSector = async (sector, id) => {
    try {
        const secuestroUpdate = await Secuestros.findByPk(id);

        if (!secuestroUpdate) {
            throw new Error(
                `El secuestro con id ${id} no existe en la base de datos.`
            );
        }

        // Actualizar el sector del secuestro
        await secuestroUpdate.update({ sector: sector });

        // Recargar el modelo para asegurarse de que contiene los últimos datos
        await secuestroUpdate.reload();

        return secuestroUpdate;
    } catch (error) {
        throw new Error(`Error al actualizar el sector: ${error.message}`);
    }
};



const validateUniqueInventario = async (nroInventario) => {
    try {
        const result = await Secuestros.findOne({
            where: { inventario: nroInventario },
        });

        if (!result) {
            return {
                isUnique: true,
                message: "El número de inventario está disponible",
            };
        }

        return { isUnique: false, message: "Ya hay un ingreso con ese número de inventario", secuestroId: result.id };
    } catch (error) {
        return {
            isUnique: false,
            message: `Error al validar el número de inventario: ${error.message}`,
        };
    }
};


const secuestroDetailById = async (id) => {
    return await Secuestros.findOne({
        where: { id: id },
        include: [
            {
                model: Actas,
                /* as: 'Actas', */ // Este alias debe coincidir con el definido en tu asociación
                attributes: ['nro', 'lugar', 'inspector', 'fecha_hora'],
            },
            {
                model: Vehiculos,

                attributes: ['tipovh', 'dominio', 'marcavh', 'modelovh'],
            },
            {
                model: Infractores,

                attributes: ['nombreCompleto', 'dni', 'sexo', 'cuil'],
            },
        ],
    });
};



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
  


module.exports = { postSecuestro, getAllSecuestros, getRegistro, infraccionesBySecuestroId, updateFoto, updateSector, validateUniqueInventario, secuestroDetailById };
