const {Secuestros,Actas,Vehiculos}= require('../db.js');

const getAllSecuestros = async ({ limit, offset }) => {
  try {
      const secuestros = await Secuestros.findAll({
          limit,
          offset,
          include: [
              {
                  model: Actas,
                  attributes: ['nro', 'lugar'],
              },
              {
                  model: Vehiculos,
                  attributes: ['tipovh', 'dominio'],
              },
          ],
      });
      return secuestros; 
  } catch (error) {
      console.error("Error fetching secuestros:", error.message); // Log para depuración
      throw new Error("No se pudieron obtener los secuestros. Inténtalo de nuevo más tarde."); // Lanza un error personalizado
  }
};


module.exports={getAllSecuestros}