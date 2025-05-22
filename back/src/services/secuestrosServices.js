const { Secuestros, Actas, Vehiculos, Users, Secuestros_infracciones, Infracciones, Infractores, Egresos, Compactados } = require("../db.js");
const { Op } = require('sequelize');
const axios = require("axios");
const { postCompactado, notificateCompactacionToJuzgado } = require("./compactadosServices.js");
require("dotenv").config();


const getAllSecuestros = async ({ limit, offset, filter, vehicleType }) => {
  try {
    let whereCondition = {}; 

    if (filter === "ingresados") {
      whereCondition = {
        estado: {
          [Op.in]: ["Ingresado"/* , "Desconocido", "No compactar", "A compactar" */],
        },
        egreso: null, // Aseguramos que no tengan egreso
        compactado: null, // Aseguramos que no estén compactados
      };
    } else if (filter === "egresados") {
      whereCondition = {
        estado: "Egresado", // Solo los que tienen el estado Egresado
        compactado: null, // Aseguramos que no estén compactados
      };
    } else if (filter === "compactados") {
      whereCondition = {
        /* estado: "Compactado", */ // Solo los que tienen el estado Compactado
        compactado: { [Op.not]: null }, // Aseguramos que estén compactados
      };
    }

    
    let includeCondition = [
      {
        model: Actas,
        attributes: ["nro", "lugar"],
      },
      {// Filtro por tipo de vehículo
        model: Vehiculos,
        attributes: ["tipovh", "dominio"],
        where: vehicleType === "todos"
        ? undefined // Si es "todos", no filtramos
        : vehicleType === "Otro"
        ? { tipovh: { [Op.notIn]: ["Automóvil", "Moto"] } } // "Otro" excluye Automóvil y Moto
        : { tipovh: vehicleType }, // Filtrado normal
      },
    ];

    // Realizamos la búsqueda con los filtros aplicados
    const secuestros = await Secuestros.findAll({
      where: whereCondition, // Aplica el filtro de estado y otros campos
      limit,
      offset,
      order: [["id", "DESC"]], // Orden descendente por 'id'
      include: includeCondition,
    });
    return secuestros;
  } catch (error) {
    console.error("Error fetching secuestros:", error.message); // Log para depuración
    throw new Error(
      "No se pudieron obtener los secuestros. Inténtalo de nuevo más tarde."
    ); // Lanza un error personalizado
  }
};






const getRegistro = async ({ date, startDate, endDate, estado, sector, tipovh, user }) => {
  try {

    let whereCondition = {};
    let fechaFiltro = {};

    if (estado && estado !== "todos") {
      whereCondition.estado = estado;
    }

    if (sector && sector !== "todos") {
      whereCondition.sector = sector;
    }

    if (user && user !== "todos") {
      whereCondition.user = user;
    }

    // Convertir fechas a timestamps
    const convertToTimestamp = (dateString) => new Date(`${dateString}T00:00:00`).getTime();
    const dateTimestamp = date ? convertToTimestamp(date) : null;
    const startTimestamp = startDate ? convertToTimestamp(startDate) : null;
    const endTimestamp = endDate ? convertToTimestamp(endDate) + 86399999 : null;


    // Caso especial para filtrar fechas en egresos y compactados
    if (estado === "Egresado") {
      if (dateTimestamp) {
        const startOfDay = new Date(dateTimestamp).setHours(0, 0, 0, 0);
        const endOfDay = new Date(dateTimestamp).setHours(23, 59, 59, 999);

        fechaFiltro.fecha_hora = { [Op.between]: [startOfDay, endOfDay] };
      } else if (startTimestamp && endTimestamp) {
        fechaFiltro.fecha_hora = { [Op.between]: [startTimestamp, endTimestamp] };
      } else if (startTimestamp) {
        fechaFiltro.fecha_hora = { [Op.gte]: startTimestamp };
      } else if (endTimestamp) {
        fechaFiltro.fecha_hora = { [Op.lte]: endTimestamp };
      }
    } else if (estado === "Compactado") {
      if (dateTimestamp) {
        const startOfDay = new Date(dateTimestamp).setHours(0, 0, 0, 0);
        const endOfDay = new Date(dateTimestamp).setHours(23, 59, 59, 999);

        fechaFiltro.fecha_hora = { [Op.between]: [startOfDay, endOfDay] };
      } else if (startTimestamp && endTimestamp) {
        fechaFiltro.fecha_hora = { [Op.between]: [startTimestamp, endTimestamp] };
      } else if (startTimestamp) {
        fechaFiltro.fecha_hora = { [Op.gte]: startTimestamp };
      } else if (endTimestamp) {
        fechaFiltro.fecha_hora = { [Op.lte]: endTimestamp };
      }
    } else {
      // Filtrar por fecha en Secuestros
      if (dateTimestamp) {
        const startOfDay = new Date(`${date}T00:00:00`).getTime();
        const endOfDay = new Date(`${date}T23:59:59`).getTime();

        whereCondition.fecha_hora = { [Op.between]: [startOfDay, endOfDay] };

      } else if (startTimestamp && endTimestamp) {
        whereCondition.fecha_hora = { [Op.between]: [startTimestamp, endTimestamp] };
      } else if (startTimestamp) {
        whereCondition.fecha_hora = { [Op.gte]: startTimestamp };
      } else if (endTimestamp) {
        whereCondition.fecha_hora = { [Op.lte]: endTimestamp };
      }
    }


    // Filtro de tipo de vehículo
    let vehiculoFiltro = undefined;

    if (tipovh && tipovh !== "todos") {
      if (tipovh === "Otro") {
        vehiculoFiltro = { tipovh: { [Op.notIn]: ["Automóvil", "Moto"] } };
      } else {
        vehiculoFiltro = { tipovh };
      }
    }
    // Consultar la base de datos
    const secuestros = await Secuestros.findAll({
      where: whereCondition,
      order: [["id", "DESC"]],
      include: [
        { model: Actas, attributes: ["nro", "fecha_hora"] },
        { model: Users, attributes: ["nombreCompleto"] },

        {
          model: Vehiculos,
          attributes: ["dominio", "tipovh"],
          where: vehiculoFiltro,
        },

        {
          model: Egresos,
          attributes: ["fecha_hora"],
          required: estado === "Egresado", // Si es egresado, se debe filtrar por esta fecha
          where: estado === "Egresado" ? fechaFiltro : undefined,
          include: [{ model: Users, attributes: ["nombreCompleto"] }],
        },
        {
          model: Compactados,
          attributes: ["fecha_hora"],
          required: estado === "Compactado", // Si es compactado, se debe filtrar por esta fecha
          where: estado === "Compactado" ? fechaFiltro : undefined,
          include: [{ model: Users, attributes: ["nombreCompleto"] }],
        },
      ],
    });

    return secuestros;
  } catch (error) {
    console.error("Error fetching registros:", error.message);
    throw new Error("No se pudieron obtener los registros. Inténtalo de nuevo más tarde.");
  }
};




const infraccionesBySecuestroId = async (id) => {
  return await Secuestros_infracciones.findAll({
    where: { secuestro_id: id },
    include: [
      {
        model: Infracciones,
        attributes: ['descrip', 'digesto'],
      },

    ],
  });
};

const updateFoto = async (fotoUrl, id) => {
  try {
    const secuestroUpdate = await Secuestros.findByPk(id);

    if (!secuestroUpdate) {
      throw new Error(
        `El secuestro con id ${id} no existe en la base de datos.`
      );
    }

    // Actualizar la foto del secuestro con la URL del FTP
    await secuestroUpdate.update({ foto: fotoUrl });

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

const updateEstado = async (estado, id) => {
  try {
    const secuestroUpdate = await Secuestros.findByPk(id);

    if (!secuestroUpdate) {
      throw new Error(
        `El secuestro con id ${id} no existe en la base de datos.`
      );
    }

    // Actualizar el estado del secuestro
    await secuestroUpdate.update({ estado: estado });

    // Recargar el modelo para asegurarse de que contiene los últimos datos
    await secuestroUpdate.reload();

    return secuestroUpdate;
  } catch (error) {
    throw new Error(`Error al actualizar el estado: ${error.message}`);
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
  const secuestro = await Secuestros.findOne({
    where: { id: id },
    include: [
      {
        model: Actas,
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

  if (!secuestro) {
    return null; // Si el secuestro no existe, devuelve null
  }

  // Asegura que Acta no sea null, asignando un objeto vacío si es necesario
  secuestro.Acta = secuestro.Acta || {};

  return secuestro;
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
  /* nroInventario, */
  sector,
  /* foto */fotoUrl,
  actaNro,
  actaInspector,
  actaLugar,
  actaFecha_hora,
  /*  infracciones, */
  userId,
  estado,
) => {
  const ingreso = null; // Luego cambiar esto por el correcto manejo de "ingreso"

  var fechaTimestamp = new Date(fecha_hora).getTime();

  //----------------Fecha y hora del acta------------------------

  /* const actaDate = actaFecha_hora
    ? new Date(actaFecha_hora.replace(" ", "T")).getTime()
    : null; */
  const parseCustomDate = (dateString) => {
    if (!dateString) return null;

    const [fecha, hora] = dateString.split(", "); // Divide fecha y hora
    const [dia, mes, anio] = fecha.split("/"); // Extrae día, mes y año
    const isoDate = `${anio}-${mes}-${dia}T${hora}`; // Formato ISO

    return new Date(isoDate).getTime(); // Convierte a timestamp
  };

  /*  if (actaFecha_hora){
   const actaDate = parseCustomDate(actaFecha_hora);
 }; */
  //-----------------------------------------------------

  try {
    const newSecuestro = await Secuestros.create({
      ingreso,
      foto: fotoUrl,
      fecha_hora: fechaTimestamp,
      inventario: actaNro || null,
      sector,
      estado,
    });

    const newVehiculo = await Vehiculos.create({
      marcavh: vehiculoMarca,
      modelovh: vehiculoModelo,
      tipovh: vehiculoTipo,
      dominio: vehiculoDominio,
    });

    const validarDNI = (dni) => {
      return /^\d+$/.test(dni) ? dni : null; // Verifica si dni contiene solo dígitos, de lo contrario, asigna null
    };

    const newInfractor = await Infractores.create({
      dni: validarDNI(infractorDni), // Si no es numérico, lo convierte en null
      nombreCompleto: infractorNombre,
      sexo: infractorSexo,
      cuil: infractorCuil || null,
    });

    const user = await Users.findOne({ where: { id: userId } })

    // Si los datos del acta están presentes, crear el acta y vincularla (ingreso normal)
    if (actaNro || actaInspector || actaLugar || actaFecha_hora) {
      const newActa = await Actas.create({
        nro: actaNro,
        inspector: actaInspector,
        lugar: actaLugar,
        fecha_hora: parseCustomDate(actaFecha_hora),
      });

      await newSecuestro.setActa(newActa);
    }
    /* console.log(Object.keys(newSecuestro.__proto__)); */ //Esto es para visualizar las funciones de newSecuestro

    await newSecuestro.setVehiculo(newVehiculo);
    await newSecuestro.setInfractore(newInfractor);
    await newSecuestro.setUser(user);


    //--------------------------ESTO ERA INFRACCIONES--------------------------//
    //Esta función se creó para los casos en los que la infracción ingresada desde juzgado
    //no coincide 100% con la de la db de corralón en cuanto a la textualidad.
    //Por lo que si el digesto, y dos palabras de la decrip coinciden, ya se creará el vínculo
    /* const findMatchingInfraccion = async (descrip, digesto) => {
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
    } */

    return newSecuestro;
  } catch (error) {
    console.error("Error al crear un nuevo secuestro:", error.message);
    throw new Error("Error al crear un nuevo secuestro en la base de datos.");
  }
};

const notificateToJuzgado = async (userId, actaId) => {
  try {
    const user = await Users.findOne({ where: { id: userId } });

    if (!user) {
      throw new Error(`No se encontró el usuario con ID: ${userId}`);
    }
    const response = await axios.put(
      `${process.env.API_JUZGADO_URL}/corralon/secuestro/${actaId}`,
      {
        user: user.dni,
      },
      {
        headers: {
          Authorization: `Bearer ${process.env.SEARCH_ACTAS_TOKEN}`,
        },
      }
    );

    return response.data;
  } catch (error) {
    console.error("Error al notificar a Juzgado", error.message);
    throw new Error(
      "Error al llamar al endpoint de juzgado para cambiar estado a ingresado."
    );
  }
};

const getDetailsFromJuzgado = async (nroActa,lugar) => {
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

    return response.data;
  } catch (error) {
    console.error("Error al obtener detalles de Juzgado", error.message);
    return null; // Retorna null en caso de error para que no se detenga la ejecución
  }
};


//Esta función es usada por juzgado, para ver qué secuestros están para compactar
const getSecuestrosPorEstado = async (estado) => {
  try {
    const estadosValidos = ["a compactar", "no compactar"];
    if (!estadosValidos.includes(estado)) {
      throw new Error("Estado no válido. Debe ser 'a compactar' o 'no compactar'.");
    }

    // Consulta a la base de datos
    const secuestros = await Secuestros.findAll({
      where: { estado },
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
    console.error("Error al obtener secuestros:", error.message);
    throw new Error("No se pudieron obtener los secuestros. Inténtalo más tarde.");
  }
};

//Esta función es usada por juzgado, para ver un secuestros por nro de acta
const getSecuestroPorNroActa = async (nroActa) => {
  try {
    const acta = await Actas.findOne({ where: { nro: nroActa } });

    if (!acta) {
      return { message: "No se encontró un acta con ese número" };
    }


    const secuestro = await Secuestros.findOne({ where: { acta: acta.id },

      include: [
        {
          model: Actas,
          attributes: ["nro", "lugar"],
        },
        {
          model: Vehiculos,
          attributes: ["dominio", "tipovh", "marcavh", "modelovh"],
        },
        {
          model: Users,
          attributes: ["nombreCompleto", "dni"],
        },
        {
          model: Infractores,
          attributes: ["nombreCompleto", "dni"],
        },
      ],
    });

    if (!secuestro) {
      return { message: "No se encontró un secuestro para el acta dada" };
    }

    return secuestro;
  } catch (error) {
    console.error("Error al obtener el secuestro:", error);
    throw new Error("Error interno del servidor");
  }
};

//Para la vista "vehículos a compactar"
const getSecuestrosAcompactar = async () => {
  try {
    const secuestros = await Secuestros.findAll({
      where: { estado: "A compactar" },
      order: [["id", "DESC"]], // Orden descendente por 'id'
      include: [
        {
          model: Actas,
          attributes: ["nro", "lugar"],
        },
        {
          model: Vehiculos,
          attributes: ["dominio", "marcavh", "modelovh"],
        },
      ],
    });

    return secuestros;
  } catch (error) {
    console.error("Error al obtener los vehiculos a compactar:", error);
    throw new Error("Error interno del servidor");
  }
};


const getTotalOfSecuestros = async (filter = "todos",vehicleType="todos") => {
  try {
    let whereClause = {};  // Inicializamos el objeto de condición de filtro

    
    if (filter === "ingresados") {
      whereClause.estado = "Ingresado";
    } else if (filter === "egresados") {
      whereClause.estado = "Egresado";
    } else if (filter === "compactados") {
      whereClause.estado = "Compactado";
    }

    let includeOptions = [];
    if (vehicleType !== "todos") {
      includeOptions.push({
        model: Vehiculos,
        attributes: [], // No necesitamos traer datos, solo filtrar
        where:
          vehicleType === "Otro"
            ? { tipovh: { [Op.notIn]: ["Automóvil", "Moto"] } }
            : { tipovh: vehicleType },
      });
    }

    // Contamos los registros que coinciden con el filtro
    const total = await Secuestros.count({
      where: whereClause,
      include: includeOptions,
    });

    return total;
  } catch (error) {
    console.error("Error al obtener el total de secuestros:", error);
    throw new Error("No se pudo obtener el total de secuestros");
  }
};

const getLevantamientos = async () => {
  try {
    const response = await axios.get(
      `${process.env.API_JUZGADO_URL}/corralon/levantamiento`,
      {
        headers: {
          Authorization: `Bearer ${process.env.SEARCH_ACTAS_TOKEN}`,
        },
        params: {
          activos: true,
        },
      }
    );

    return response.data;
  } catch (error) {
    console.error("Error al obtener los levantamientos de Juzgado", error.message);
    return null; // Retorna null en caso de error para que no se detenga la ejecución
  }
};

const getIdSecuestroByActa = async (nroActa) => {
  try {
    const acta = await Actas.findOne({ where: { nro: nroActa } });

    if (!acta) {
      return { message: "No se encontró un acta con ese número" };
    }

    const secuestro = await Secuestros.findOne({
      where: { acta: acta.id },
      attributes: ["id"],
    });

    if (!secuestro) {
      return { message: "No se encontró un secuestro para el acta dada" };
    }

    return { id: secuestro.id }; // Devolver solo el ID
  } catch (error) {
    console.error("Error al obtener el ID del secuestro:", error);
    throw new Error("Error interno del servidor");
  }
};

const getAllIngresados = async (meses = 24) => {
  try {
    let whereClause = { estado: "Ingresado" };

    if (meses > 0) {
      const now = Date.now();
      const mesesAtrasEnMs = meses * 30 * 24 * 60 * 60 * 1000;
      const fechaLimite = now - mesesAtrasEnMs;

      whereClause.fecha_hora = {
        [Op.lte]: fechaLimite,
      };
    }

    const secuestros = await Secuestros.findAll({
      where: whereClause,
      order: [["id", "DESC"]],
      include: [
        {
          model: Actas,
          attributes: ["nro","lugar"],
          required: false,
        },
        {
          model: Vehiculos,
          attributes: ["dominio", "marcavh", "modelovh"],
          required: false,
        },
      ],
    });

    return secuestros;
  } catch (error) {
    console.error("Error al obtener los vehiculos ingresados para compactar:", error);
    throw new Error("Error interno del servidor");
  }
};

const updateEstadoDesconocido = async (ids) => {
  try {
    const [cantidadActualizados] = await Secuestros.update(
      { estado: "Desconocido" },
      {
        where: {
          id: ids,
        },
      }
    );

    if (cantidadActualizados === 0) {
      throw new Error("No se actualizó ningún registro. Verifica los IDs.");
    }

    const actualizados = await Secuestros.findAll({
      where: {
        id: ids,
      },
    });

    return actualizados;
  } catch (error) {
    throw new Error(`Error en actualización masiva: ${error.message}`);
  }
};

const updateEstadoAcompactar = async (ids) => {
  try {
    if (!Array.isArray(ids) || ids.length === 0) {
      throw new Error("Debes proporcionar un array de IDs válido.");
    }
    
    const [cantidadActualizados] = await Secuestros.update(
      { estado: "A compactar" },
      {
        where: {
          id: ids,
        },
      }
    );
    
    if (cantidadActualizados === 0) {
      throw new Error("No se actualizó ningún registro. Verifica los IDs.");
    }
    
    return;
  } catch (error) {
    throw new Error(`Error en actualización masiva: ${error.message}`);
  }
};

const updateEstadoCompactado = async (finalData) => {
  const { seleccionados, userId, fecha_hora } = finalData;

  try {
    if (!Array.isArray(seleccionados) || seleccionados.length === 0) {
      throw new Error("Debes proporcionar un array válido de secuestros.");
    }

    for (const { id, nro, lugar } of seleccionados) {
      await postCompactado(fecha_hora, userId, id);

      if (nro) {
        try {
          await notificateCompactacionToJuzgado(userId, nro, lugar);
        } catch (error) {
          console.error("Error al notificar al juzgado:", error.message);
        }
      }
    }

    return { mensaje: "Secuestros actualizados correctamente." };
  } catch (error) {
    throw new Error(`Error en actualización masiva: ${error.message}`);
  }
};






module.exports = { updateEstadoDesconocido, updateEstadoCompactado, updateEstadoAcompactar, getAllIngresados, getIdSecuestroByActa, getLevantamientos, getSecuestrosAcompactar, getTotalOfSecuestros, getSecuestroPorNroActa, getSecuestrosPorEstado, updateEstado, getDetailsFromJuzgado, notificateToJuzgado, /* postSecuestroIngresoPolicial */ postSecuestro, getAllSecuestros, getRegistro, infraccionesBySecuestroId, updateFoto, updateSector, validateUniqueInventario, secuestroDetailById };
