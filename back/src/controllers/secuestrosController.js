const Client = require("basic-ftp");
const fs = require("fs");
const path = require("path");
const { Readable } = require("stream");
const { getAllSecuestros, infraccionesBySecuestroId, secuestroDetailById, postSecuestro, validateUniqueInventario, updateSector, getRegistro, updateFoto, postSecuestroIngresoPolicial, notificateToJuzgado, getDetailsFromJuzgado, updateEstado, getSecuestrosPorEstado, getSecuestroPorNroActa, getTotalOfSecuestros, getSecuestrosAcompactar, getLevantamientos, getIdSecuestroByActa, getAllIngresados, updateEstadoDesconocido, updateEstadoAcompactar, updateEstadoCompactado } = require("../services/secuestrosServices");


const getAllSecuestrosController = async (req, res) => {
  const { page = 1, filter = "todos", vehicleType = "todos" } = req.query;

  const options = {
    limit: 9,
    offset: (page - 1) * 9,
    filter,
    vehicleType,
  };

  try {
    const response = await getAllSecuestros(options);
    res.status(200).json(response);
  } catch (error) {
    console.error("Error en getAllSecuestrosController:", error.message);
    res.status(500).json({ error: "Error al obtener los secuestros" });
  }
};

const getDetailSecuestroController = async (req, res) => {
  const { id } = req.params;

  try {
    /* const response2 = await infraccionesBySecuestroId(id); */
    let response = await secuestroDetailById(id);

    response = response.toJSON();

    // Verificamos si Acta existe antes de acceder a sus propiedades
    let response3 = null;
    if (response.Acta && response.Acta.nro && response.Acta.lugar) {
      response3 = await getDetailsFromJuzgado(response.Acta.nro, response.Acta.lugar);
    }

    /* response.infracciones = response2; */
    response.infoJuzgado = response3 || null;

    res.status(200).json(response);
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};




const uploadToFTP = async (readableStream, fileName) => {
  const client = new Client.Client();
  const env = process.env.NODE_ENV || "development";  // Detectar el entorno (development, stage, production)


  const FTP_HOST = process.env.FTP_HOST;
  const FTP_PORT = process.env.FTP_PORT;
  const FTP_USER = process.env.FTP_USER;
  const FTP_PASSWORD = process.env.FTP_PASSWORD;


  // Directorios según el entorno
  const remoteDir = env === "production" ? "images/corralon/production/fotos" : "images/corralon/stage/fotos";

  try {
    await client.access({
      host: FTP_HOST,
      port: FTP_PORT,
      user: FTP_USER,
      password: FTP_PASSWORD,
    });

    // Intentar cambiar al directorio especificado
    /* await (remoteDir); */

    // Si no se puede acceder, creamos los directorios paso a paso
    await client.ensureDir(remoteDir);

    // Subir la foto a la carpeta correspondiente
    await client.uploadFrom(readableStream, fileName);
    client.close();

    // Retorna la URL del archivo subido
    return `${fileName}`; /* `${FTP_PATH}${fileName}` */

  } catch (err) {
    console.error("Error subiendo archivo al FTP:", err);
    client.close();
    throw new Error("Error al subir la imagen al FTP");
  }
};



const postSecuestroController = async (req, res) => {
  const {
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
    /* foto, */
    actaNro,
    actaInspector,
    actaLugar,
    actaFecha_hora,
    /* infracciones, */
    userId,
    estado,
    actaId
  } = req.body;

  try {
    let fotoUrl = null;

    if (req.file) {
      const readableStream = Readable.from(req.file.buffer)
      const fileName = `${req.file.originalname}`; /* `${Date.now()}_${req.file.originalname}` */
      // Subir la foto al servidor FTP y obtener la URL
      fotoUrl = await uploadToFTP(readableStream, fileName);
    }

    const response = await postSecuestro(
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
      /* foto, */fotoUrl,
      actaNro,
      actaInspector,
      actaLugar,
      actaFecha_hora,
      /* infracciones, */
      userId,
      estado,
    );

    // Responder primero al cliente antes de notificar a juzgado
    res.status(200).json(response);

    // Llamar a notificateToJuzgado después de responder (solo si hay nroActa)
    if (actaNro) {
      try {
        await notificateToJuzgado(userId, actaId);

      } catch (error) {
        console.error(`Error al notificar al juzgado: ${error.message}`);
      }
    }

  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};


const validateUniqueInventarioController = async (req, res) => {
  const { nroInventario } = req.params;

  try {
    const response = await validateUniqueInventario(nroInventario);

    res.status(200).json(response);
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};

const updateSectorController = async (req, res) => {
  const { sector, id } = req.body;

  try {
    const response = await updateSector(sector, id);
    res.status(200).json(response);
  } catch (error) {
    console.error("Error en updateSectorController:", error.message);
    res.status(400).json({ error: error.message });
  }
};
const updateEstadoController = async (req, res) => {
  const { estado, id } = req.body;

  try {
    const response = await updateEstado(estado, id);
    res.status(200).json(response);
  } catch (error) {
    console.error("Error en updateEstadoController:", error.message);
    res.status(400).json({ error: error.message });
  }
};

const getRegistroController = async (req, res) => {

  const { date, startDate, endDate, estado, sector, tipovh, user } = req.query;

  try {
    const response = await getRegistro({
      date,
      startDate,
      endDate,
      estado,
      sector,
      tipovh,
      user,
    });

    res.status(200).json(response);
  } catch (error) {
    console.error("Error en getRegistroController:", error.message);
    res.status(500).json({ error: "Error al obtener los registros" });
  }
};

const updateFotoController = async (req, res) => {
  const { id } = req.body;
  try {
    if (!req.file) {
      throw new Error("No se ha recibido ninguna imagen.");
    }

    const readableStream = Readable.from(req.file.buffer);
    const fileName = `${req.file.originalname}`;

    // Subir la imagen al FTP y obtener la URL
    const fotoUrl = await uploadToFTP(readableStream, fileName);

    // Llamar al servicio para actualizar la base de datos con la nueva URL
    const response = await updateFoto(fotoUrl, id);

    res.status(200).json(response);
  } catch (error) {
    console.error("Error en updateFotoController:", error.message);
    res.status(400).json({ error: error.message });
  }
};


//Esta función es usada por juzgado, para ver qué secuestros están para compactar
const getSecuestrosPorEstadoController = async (req, res) => {
  try {
    const { estado } = req.params;

    const secuestros = await getSecuestrosPorEstado(estado);

    res.status(200).json(secuestros);
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};

//Esta función es usada por juzgado, para ver un secuestros por nro de acta
const getSecuestroPorNroActaController = async (req, res) => {
  const { nroActa } = req.params;

  try {
    const secuestro = await getSecuestroPorNroActa(nroActa);

    if (secuestro.message) {
      return res.status(404).json({ message: secuestro.message });
    }

    res.json(secuestro);
  } catch (error) {
    res.status(500).json({ message: "Error interno del servidor" });
  }
};
const getAcompactarController = async (req, res) => {

  try {
    const response = await getSecuestrosAcompactar();

    res.json(response);
  } catch (error) {
    res.status(500).json({ message: "Error interno del servidor" });
  }
};

const getTotalSecuestrosController = async (req, res) => {
  const { filter = "todos", vehicleType = "todos" } = req.query;

  try {
    const total = await getTotalOfSecuestros(filter, vehicleType);
    res.status(200).json({ total });
  } catch (error) {
    console.error("Error en getTotalSecuestrosController:", error.message);
    res.status(500).json({ message: "Error al obtener el total de secuestros" });
  }
};

const getLevantamientosController = async (req, res) => {

  try {
    const response = await getLevantamientos();
    res.json(response);
  } catch (error) {
    console.error("Error en getLevantamientosController:", error);
    res.status(500).json({ message: "Error al obtener los levantamientos" });
  }
};

const getIdSecuestroByActaController = async (req, res) => {
  const { nroActa } = req.params;
  try {
    const response = await getIdSecuestroByActa(nroActa);
    res.json(response);
  } catch (error) {
    console.error("Error en getIdSecuestroByActaController:", error);
    res.status(500).json({ message: "Error al obtener el id del secuestro" });
  }
};

const updateAcompactarController = async (req, res) => {
  const { ids } = req.body;

  try {
    const response = await updateEstadoAcompactar(ids);
    res.status(200).json(response);
  } catch (error) {
    console.error("Error en updateAcompactarController:", error.message);
    res.status(400).json({ error: error.message });
  }
};


const updateCompactadosController = async (req, res) => {
  const { finalData } = req.body;

  try {
    const response = await updateEstadoCompactado(finalData);
    res.status(200).json(response);
  } catch (error) {
    console.error("Error en updateCompactadosController:", error.message);
    res.status(400).json({ error: error.message });
  }
};

const getAllIngresadosController = async (req, res) => {
  const { meses = 24 } = req.params;

  const mesesNum = Number(meses);

  if (isNaN(mesesNum)) {
    return res.status(400).json({ error: "Parámetro 'meses' inválido" });
  }
  /* const options = {
    limit: 9,
    offset: (page - 1) * 9,
    filter,
    vehicleType,
  }; */

  try {
    const response = await getAllIngresados(mesesNum);
    res.status(200).json(response);
  } catch (error) {
    console.error("Error en getAllIngresadosController:", error.message);
    res.status(500).json({ error: "Error al obtener los secuestros ingresados" });
  }
};

const updateEstadoDesconocidoController = async (req, res) => {
  const { ids } = req.body;
  try {
    const response = await updateEstadoDesconocido(ids);

    res.status(200).json(response);
  } catch (error) {
    console.error("Error en updateEstadoDesconocidoController:", error.message);
    res.status(400).json({ error: error.message });
  }
};



module.exports = {
  updateEstadoDesconocidoController,
  getAllIngresadosController,
  updateCompactadosController,
  updateAcompactarController,
  getIdSecuestroByActaController,
  getLevantamientosController,
  getAcompactarController,
  getTotalSecuestrosController,
  getSecuestroPorNroActaController,
  getSecuestrosPorEstadoController,
  getAllSecuestrosController,
  getDetailSecuestroController,
  postSecuestroController,
  validateUniqueInventarioController,
  updateSectorController,
  getRegistroController,
  updateFotoController,
  updateEstadoController
};
