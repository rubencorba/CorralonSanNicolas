const {Vehiculos, Secuestros}= require('../db.js');

const getAllVehiculos =async()=> await Vehiculos.findAll()

const getVehiculoByDominio = async (dominio) => {
    try {
      const vehiculo = await Vehiculos.findOne({
        where: { dominio },
        include: { model: Secuestros, as: "Secuestro" },
        order: [["id", "DESC"]],
      });
  
      if (!vehiculo) {
          return null;;
      }
  
      const secuestroId = vehiculo.Secuestro.id;

      return secuestroId;
    } catch (error) {
      console.error("Error al buscar el vehiculo", error);
      throw error;
    }
  };


module.exports={getAllVehiculos, getVehiculoByDominio}