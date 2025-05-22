const Client = require("basic-ftp");
const { postEgreso, getEgreso, notificateEgresoToJuzgado } = require("../services/egresosServices");
const { Readable } = require("stream");


const uploadToFTP = async (readableStream, fileName) => {
  const client = new Client.Client();
  const env = process.env.NODE_ENV || "development";  // Detectar el entorno (development, stage, production)


  const FTP_HOST = process.env.FTP_HOST;
  const FTP_PORT = process.env.FTP_PORT;
  const FTP_USER = process.env.FTP_USER;
  const FTP_PASSWORD = process.env.FTP_PASSWORD;


  // Directorios según el entorno
  const remoteDir = env === "production" ? "images/corralon/production/firmas_secuestros" : "images/corralon/stage/firmas_secuestros";

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
    await client.uploadFrom(readableStream,fileName);
    client.close();

    // Retorna la URL del archivo subido
    return `${fileName}`; /* `${FTP_PATH}${fileName}` */

  } catch (err) {
    console.error("Error subiendo archivo al FTP:", err);
    client.close();
    throw new Error("Error al subir la imagen al FTP");
  }
};


const postEgresoController = async (req, res) => {
  const {
    bPago,
    dni,
    domicilio,
    fecha_hora,
    licencia,
    nombreCompleto,
    obs,
    tarjetaVerde,
    /* firma, */
    userId,
    idSecuestro,

    idLevantamiento
  } = req.body;

  try {
    // Inicializa la URL de la firma como null
    let firmaUrl = null;
    // Verifica si hay un archivo de firma subido
    if (req.file) {
      const readableStream = Readable.from(req.file.buffer); // Convierte el buffer del archivo en un stream legible
      const fileName = `firma_${Date.now()}.png`; // Nombre único para el archivo

      // Subir la firma al servidor FTP y obtener la URL de la firma
      firmaUrl = await uploadToFTP(readableStream, fileName); // Aquí usamos la función `uploadToFTP` que definiremos después
    }

    const response = await postEgreso(
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
    );

    //Notifica el egreso a juzgado
    if (idLevantamiento) {
    try {
      await notificateEgresoToJuzgado(userId, idLevantamiento);
    } catch (error) {
      console.error("Error al notificar el egreso al juzgado:", error.message);
    }
    }

    res.status(200).json(response);
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};


const getEgresoController = async (req, res) => {
  const { idSecuestro } = req.params;

  try {
    const response = await getEgreso(idSecuestro);
    
    res.status(200).json(response);
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};

module.exports = { postEgresoController, getEgresoController };
