const { getActabyNro } = require("../services/actasServices");


const getActabyNroController = async (req, res) => {
    try {
      const { nro } = req.params;
      const response = await getActabyNro(nro);
  
      /* if (response.error) {
        
        return res.status(404).json({ message: response.error });
      } */
  
      res.status(200).json(response);
    } catch (error) {
      console.error("Error en getActabyNroController:", error);
      res.status(500).json({ message: "Error interno del servidor" });
    }
  };

module.exports={getActabyNroController};