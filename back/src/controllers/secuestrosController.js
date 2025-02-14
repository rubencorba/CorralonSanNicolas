const { getAllSecuestros } = require("../handlerss/getAllSecuestros");
const { getRegistro } = require("../handlerss/getRegistro");
const {
  infraccionesBySecuestroId,
} = require("../handlerss/infraccionesBySecuestroId");
const { postSecuestro } = require("../handlerss/postSecuestro");
const { secuestroDetailById } = require("../handlerss/secuestroDetailById");
const { updateFoto } = require("../handlerss/updateFoto");
const { updateSector } = require("../handlerss/updateSector");
const {
  validateUniqueInventario,
} = require("../handlerss/validateUniqueInventario");


const getAllSecuestrosController = async (req, res) => {
  const { page = 1, filter = "todos" } = req.query;

  const options = {
    limit: 9,
    offset: (page - 1) * 9,
    filter,
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
    const response2 = await infraccionesBySecuestroId(id);
    let response = await secuestroDetailById(id);

    response = response.toJSON();

    response.infracciones = response2;
    res.status(200).json(response);
  } catch (error) {
    res.status(400).json({ error: error.message });
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
    nroInventario,
    sector,
    foto,
    actaNro,
    actaInspector,
    actaLugar,
    actaFecha_hora,
    infracciones,
    userId,
  } = req.body;

  try {
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
      nroInventario,
      sector,
      foto,
      actaNro,
      actaInspector,
      actaLugar,
      actaFecha_hora,
      infracciones,
      userId
    );

    res.status(200).json(response);
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

const getRegistroController = async (req, res) => {

  
   
  const {
    compactados,
    egresados,
    ingresados,
    sector,
    user,
    startDate,
    endDate
  } = req.query;

  console.log(compactados,
    egresados,
    ingresados,
    sector,
    user,
    startDate,
    endDate);

  

  try {
    const response = await getRegistro(
      compactados,
      egresados,
      ingresados,
      sector,
      user,
      startDate,
      endDate
    );

    res.status(200).json(response);
  } catch (error) {
    console.error("Error en getRegistroController:", error.message);
    res.status(500).json({ error: "Error al obtener los registros" });
  }
};

const updateFotoController = async (req, res) => {
  const { foto,id } = req.body;

  try {
    
    const response = await updateFoto(foto, id);
    res.status(200).json(response);
  } catch (error) {
    console.error("Error en updateFotoController:", error.message);
    res.status(400).json({ error: error.message });
  }
};

module.exports = {
  getAllSecuestrosController,
  getDetailSecuestroController,
  postSecuestroController,
  validateUniqueInventarioController,
  updateSectorController,
  getRegistroController,
  updateFotoController
};
