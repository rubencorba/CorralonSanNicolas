const { getAllVehiculos, getVehiculoByDominio } = require("../services/vehiculosServices");

const getAllVehiculosController = async (req, res) => { 
  const response = await getAllVehiculos();
  res.status(200).json(response);
};
const getVehiculoByDominioController = async (req, res) => {
  try {
    const { dominio } = req.params;
    const secuestro = await getVehiculoByDominio(dominio);

    if (!secuestro) {
      return res.status(404).json({
        success: false,
        message: "No se encontró vehículo con este dominio",
      });
    }

    return res.status(200).json({
      success: true,
      message: "Secuestro encontrado",
      data: secuestro
    });
  } catch (error) {
    console.error("Error en getVehiculoByDominioController:", error);
    return res.status(500).json({
      success: false,
      message: "Error interno del servidor",
    });
  }
};

module.exports = { getAllVehiculosController, getVehiculoByDominioController };
