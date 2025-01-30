const { getAllVehiculos } = require("../handlerss/getAllVehiculos");
const { getVehiculoByDominio } = require("../handlerss/getVehiculoByDominio");

const getAllVehiculosController = async (req, res) => { 
  const response = await getAllVehiculos();
  res.status(200).json(response);
};
const getVehiculoByDominioController = async (req, res) => {
  try {
    const { dominio } = req.params;
    const response = await getVehiculoByDominio(dominio);

    /* if (response.error) {
          
          return res.status(404).json({ message: response.error });
        } */

    res.status(200).json(response);
  } catch (error) {
    console.error("Error en getVehiculoByDominioHandler:", error);
    res.status(500).json({ message: "Error interno del servidor" });
  }
};

module.exports = { getAllVehiculosController, getVehiculoByDominioController };
