const { getActabyNro, getActasJuzgado, getDetailActaJuzgado, consultarCompactacionJuzgado } = require("../services/actasServices");


const getActabyNroController = async (req, res) => {
  try {
    const { nro } = req.params;
    const response = await getActabyNro(nro);

    if (!response) {
      return res.status(404).json({
        message: `No se encontró vehículo con ese número de acta`,
        success: false,
        data: null,
      });
    }

    return res.status(200).json({
      message: "Secuestro encontrado",
      success: true,
      data: response,
    });
  } catch (error) {
    console.error("Error en getActabyNroController:", error);
    return res.status(500).json({
      message: "Error interno del servidor",
      success: false,
      data: null,
    });
  }
};

const getActasJuzgadoController = async (req, res) => {
  try {
    const data = await getActasJuzgado();
    res.status(200).json(data);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
  };

  const getDetailActaJuzgadoController = async (req, res) => {
  try {
    const { nroActa } = req.params;

    const data = await getDetailActaJuzgado(nroActa);
    res.status(200).json(data);
  } catch (error) {
    console.log(error.message)
    res.status(500).json({ error: error.message });
  }
  };

  const consultarCompactacionController = async (req, res) => {
    const { nroActa, lugar } = req.query;
    try {
      const response = await consultarCompactacionJuzgado( nroActa, lugar );
      res.status(200).json(response);
    } catch (error) {
      console.error("Error en consultarCompactacionController:", error.message);
      res.status(500).json({ error: "Error al obtener la respuesta de juzgado sobre la compactacion" });
    }
  };

module.exports={consultarCompactacionController, getActabyNroController,getActasJuzgadoController,getDetailActaJuzgadoController};