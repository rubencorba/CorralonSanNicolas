const { getResponseJuzgado, postLicencia, getAllLicencias, getLicenciaByDni, getTotalOfLicencias, postEgresoLicencia, getLicenciaEgresada, updateFotoLicencia } = require("../services/licenciasServices");
const Client = require("basic-ftp");
const { Readable } = require("stream");


const uploadToFTPFirma = async (readableStream, fileName) => {
  const client = new Client.Client();
  const env = process.env.NODE_ENV || "development";  // Detectar el entorno (development, stage, production)


  const FTP_HOST = process.env.FTP_HOST;
  const FTP_PORT = process.env.FTP_PORT;
  const FTP_USER = process.env.FTP_USER;
  const FTP_PASSWORD = process.env.FTP_PASSWORD;


  // Directorios según el entorno
  const remoteDir = env === "production" ? "images/corralon/production/firmas_licencias" : "images/corralon/stage/firmas_licencias";

  try {
    await client.access({
      host: FTP_HOST,
      port: FTP_PORT,
      user: FTP_USER,
      password: FTP_PASSWORD,
    });

    // Si no se puede acceder, creamos los directorios paso a paso
    await client.ensureDir(remoteDir);

    // Subir la foto a la carpeta correspondiente
    await client.uploadFrom(readableStream,fileName);
    client.close();

    // Retorna la URL del archivo subido
    return `${fileName}`;

  } catch (err) {
    console.error("Error subiendo archivo al FTP:", err);
    client.close();
    throw new Error("Error al subir la firma al FTP");
  }
};


const getAllLicenciasController = async (req, res) => {
  const { page = 1, filter = "todas" } = req.query;

  const options = {
    limit: 9,
    offset: (page - 1) * 9,
    filter,
  };

  try {
    const response = await getAllLicencias(options);
    res.status(200).json(response);
  } catch (error) {
    console.error("Error en getAllLicenciasController:", error.message);
    res.status(500).json({ error: "Error al obtener las licencias" });
  }
};

const uploadToFTP = async (readableStream, fileName) => {
  const client = new Client.Client();
  const env = process.env.NODE_ENV || "development";


  const FTP_HOST = process.env.FTP_HOST;
  const FTP_PORT = process.env.FTP_PORT;
  const FTP_USER = process.env.FTP_USER;
  const FTP_PASSWORD = process.env.FTP_PASSWORD;


  // Directorios según el entorno
  const remoteDir = env === "production" ? "images/corralon/production/fotos_licencias" : "images/corralon/stage/fotos_licencias";

  try {
    await client.access({
      host: FTP_HOST,
      port: FTP_PORT,
      user: FTP_USER,
      password: FTP_PASSWORD,
    });

    // Si no se puede acceder, creamos los directorios paso a paso
    await client.ensureDir(remoteDir);

    // Subir la foto a la carpeta correspondiente
    await client.uploadFrom(readableStream,fileName);
    client.close();

    // Retorna la URL del archivo subido
    return `${fileName}`;

  } catch (err) {
    console.error("Error subiendo archivo al FTP:", err);
    client.close();
    throw new Error("Error al subir la imagen al FTP");
  }
};

const postLicenciaController = async (req, res) => {
  try {
    let fotoUrl = null;

    if (req.file) {
      const readableStream = Readable.from(req.file.buffer)
      const fileName = `${req.file.originalname}`;
      // Subir la foto al servidor FTP y obtener la URL
      fotoUrl = await uploadToFTP(readableStream, fileName);
    }
    const licenciaData = { ...req.body, foto: fotoUrl };
    const response = await postLicencia(licenciaData);
    res.status(201).json(response);
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};

const updateFotoLicenciaController = async (req, res) => {
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
    const response = await updateFotoLicencia(fotoUrl, id);

    res.status(200).json(response);
  } catch (error) {
    console.error("Error en updateFotoLicenciaController:", error.message);
    res.status(400).json({ error: error.message });
  }
};


const postEgresoLicenciaController = async (req, res) => {
  const {
    licencia_id,
    fecha_hora,
    userId,
  } = req.body;

  try {
    // Inicializa la URL de la firma como null
    let firmaUrl = null;
    // Verifica si hay un archivo de firma subido
    if (req.file) {
      const readableStream = Readable.from(req.file.buffer); // Convierte el buffer del archivo en un stream legible
      const fileName = `firma_${Date.now()}.png`; // Nombre único para el archivo

      // Subir la firma al servidor FTP y obtener la URL de la firma
      firmaUrl = await uploadToFTPFirma(readableStream, fileName);
    }
    const response = await postEgresoLicencia(licencia_id, fecha_hora, userId,firmaUrl);
    res.status(201).json(response);
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};




const getLicenciaController = async (req, res) => {
  const { dni } = req.params;

  try {
    const response = await getLicenciaByDni(dni);

    res.status(200).json(response);
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};

const getLicenciaEgresadaController = async (req, res) => {
  const { idLicencia } = req.params;

  try {
    const response = await getLicenciaEgresada(idLicencia);

    res.status(200).json(response);
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};

const geInfoEgresoController = async (req, res) => {
  const { dni } = req.params;

  try {
    const response = await getResponseJuzgado(dni);

    res.status(200).json(response);
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};

const getTotalLicenciasController = async (req, res) => {
  const { filter="todas" } = req.query;
  try {
    const total = await getTotalOfLicencias(filter);
    res.json( total );
  } catch (error) {
    res.status(500).json({ message: "Error al obtener el total de licencias" });
  }
};


module.exports = { updateFotoLicenciaController, getLicenciaEgresadaController, postEgresoLicenciaController, geInfoEgresoController, getTotalLicenciasController, getLicenciaController,  postLicenciaController,  getAllLicenciasController };
