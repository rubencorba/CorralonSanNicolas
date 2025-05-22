const { Licencia, Users, LicenciaEgresada } = require('../db');
const { Op } = require('sequelize');
const axios = require("axios");
require("dotenv").config();

const getAllLicencias = async ({ limit, offset, filter }) => {
  try {
    let whereCondition = {};

    if (filter === "ingresadas") {
      whereCondition = {
        egresada: null,
      };
    } else if (filter === "egresadas") {
      whereCondition = {
        egresada: { [Op.not]: null }, // Solo las que tienen un valor en egreso
      };
    }


    const licencias = await Licencia.findAll({
      where: whereCondition,
      limit,
      offset,
      order: [["id", "DESC"]], 
    });
    return licencias;
  } catch (error) {
    console.error("Error fetching licencias:", error.message);
    throw new Error(
      "No se pudieron obtener las licencias. Inténtalo de nuevo más tarde."
    );
  }
};


const getResponseJuzgado = async (dni) => {
    try {
        const { data } = await axios.get(
            `${process.env.API_JUZGADO_URL}/corralon/licencia/${dni}`,
            {
                headers: {
                    Authorization: `Bearer ${process.env.SEARCH_ACTAS_TOKEN}`,
                },
            }
        );

    return data;
  } catch (error) {
    console.error("Error al obtener respuesta de juzgado:", error.message);
    throw new Error("Hubo un problema al obtener respuesta de juzgado.");
  }
};

const postLicencia = async ({ dni, nombre, fecha_hora, user, observaciones/* , tipo */, numero, foto = null }) => {
  try {
    if (!dni || !nombre || !fecha_hora || !user /* || !tipo */|| !numero) {
        throw new Error("Todos los campos obligatorios deben estar completos.");
    }

    const usuario = await Users.findOne({ where: { id: user } });

    if (!usuario) {
        throw new Error("El usuario no existe.");
    }

    // Crea la nueva licencia
    const nuevaLicencia = await Licencia.create({
        dni,
        nombre,
        fecha_hora,
        user,
        observaciones,
        /* tipo, */
        numero,
        foto
    });

    // Relaciona la licencia con el usuario
    await nuevaLicencia.setUser(usuario);

    return nuevaLicencia;
  } catch (error) {
    console.error("Error en postLicencia:", error.message);
    throw new Error("Hubo un error al crear la licencia: " + error.message);
  }
};

const postEgresoLicencia = async (licencia_id, fecha_hora, userId,firmaUrl) => {

  if (!licencia_id || !firmaUrl || !fecha_hora || !userId) {
    throw new Error("Todos los campos obligatorios deben estar completos.");
  }

  const nuevaLicenciaEgresada = await LicenciaEgresada.create({
    licencia_id,
    firma: firmaUrl,
    fecha_hora: fecha_hora || new Date(),
    user: userId,
  });

  // Relaciona la licencia con el usuario
  const usuario = await Users.findOne({ where: { id: userId } });

  if (!usuario) {
    throw new Error("El usuario no existe.");
  }
  await nuevaLicenciaEgresada.setUser(usuario);

  // Actualizar la licencia correspondiente con el id de la egresada
  await Licencia.update(
    { egresada: nuevaLicenciaEgresada.id },
    { where: { id: licencia_id } }
  );



  return nuevaLicenciaEgresada;
};

const getLicenciaByDni = async (dni) => {
  try {
    const licencia = await Licencia.findOne({
      where: { dni },
      order: [["id", "DESC"]],
    });

    return licencia;
  } catch (error) {
    console.error("Error al buscar la licencia:", error);
    throw new Error("No se pudo obtener la licencia");
  }
};

const getLicenciaEgresada = async (idLicencia) => {
  try {
    // Buscar la licencia con su ID
    const licencia = await Licencia.findOne({
      where: { id: idLicencia },
    });

    // Verificar que la licencia existe y tiene un egreso
    if (!licencia || !licencia.egresada) {
      throw new Error("No se encontró la licencia o aún no tiene un egreso.");
    }

    // Buscar la licencia egresada e incluir la información del usuario asociado
    const licenciaEgresada = await LicenciaEgresada.findOne({
      where: { id: licencia.egresada },
      include: {
        model: Users,
        attributes: ["nombreCompleto", "dni"],
      },
    });

    // Verificar si el egreso existe
    if (!licenciaEgresada) {
      throw new Error("La licencia egresada asociada no existe.");
    }

    return licenciaEgresada;
  } catch (error) {
    console.error("Error al obtener la licencia egresada:", error.message);
    throw new Error("Hubo un problema al recuperar la información del egreso.");
  }
};

const getTotalOfLicencias = async (filter) => {
  try {
    let whereCondition = {};

    if (filter === "ingresadas") {
      whereCondition = {
        egresada: null,
      };
    } else if (filter === "egresadas") {
      whereCondition = {
        egresada: { [Op.not]: null }, // Solo las que tienen un valor en egreso
      };
    }
    const total = await Licencia.count({
      where: whereCondition,
    });
    return total;
  } catch (error) {
    console.error("Error al obtener el total de licencias:", error);
    throw new Error("No se pudo obtener el total de licencias");
  }
};

const updateFotoLicencia = async (fotoUrl, id) => {
  try {
    const licenciaUpdate = await Licencia.findByPk(id);

    if (!licenciaUpdate) {
      throw new Error(
        `La licencia con id ${id} no existe en la base de datos.`
      );
    }

    // Actualizar la foto del secuestro con la URL del FTP
    await licenciaUpdate.update({ foto: fotoUrl });

    // Recargar el modelo para asegurarse de que contiene los últimos datos
    await licenciaUpdate.reload();

    return licenciaUpdate;
  } catch (error) {
    throw new Error(`Error al actualizar la foto: ${error.message}`);
  }
};




module.exports = { updateFotoLicencia, getLicenciaEgresada, postEgresoLicencia, getTotalOfLicencias, getResponseJuzgado, postLicencia, getAllLicencias, getLicenciaByDni };