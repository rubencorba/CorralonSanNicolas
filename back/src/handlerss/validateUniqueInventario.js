const { Secuestros } = require("../db.js");

const validateUniqueInventario = async (nroInventario) => {
    try {
        const result = await Secuestros.findOne({
          where: { inventario: nroInventario },
        });
    
        if (!result) {
          return {
            isUnique: true,
            message: "El número de inventario está disponible",
          };
        }
    
        return { isUnique: false, message: "Ya hay un ingreso con ese número de inventario",secuestroId: result.id };
      } catch (error) {
        return {
          isUnique: false,
          message: `Error al validar el número de inventario: ${error.message}`,
        };
      }
};

module.exports = { validateUniqueInventario };
