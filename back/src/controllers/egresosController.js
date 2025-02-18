const { postEgreso, getEgreso } = require("../services/egresosServices");

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
    firma,
    userId,
    idSecuestro
  } = req.body;

  try {
    const response = await postEgreso(
      bPago,
      dni,
      domicilio,
      fecha_hora,
      licencia,
      nombreCompleto,
      obs,
      tarjetaVerde,
      firma,
      userId,
      idSecuestro
    );

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
