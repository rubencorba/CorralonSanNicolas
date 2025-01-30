const { getAllSecuestros } = require("../handlerss/getAllSecuestros");
const {
  infraccionesBySecuestroId,
} = require("../handlerss/infraccionesBySecuestroId");
const { postSecuestro } = require("../handlerss/postSecuestro");
const { secuestroDetailById } = require("../handlerss/secuestroDetailById");
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

  const response = await getAllSecuestros(options);
  res.status(200).json(response);
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
    userId
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

module.exports = {
  getAllSecuestrosController,
  getDetailSecuestroController,
  postSecuestroController,
  validateUniqueInventarioController,
  updateSectorController,
};
