const { postCompactado, notificateCompactacionToJuzgado } = require("../services/compactadosServices");

const postCompactadoController = async (req, res) => {
  const {
    fecha_hora,
    userId,
    idSecuestro,
    nroActa,
    lugar
  } = req.body;

  try {
    const response = await postCompactado(
        fecha_hora,
        userId,
        idSecuestro,
    );

   //Notifica compactación a juzgado
   if (nroActa) {
    try {
      await notificateCompactacionToJuzgado(userId, nroActa, lugar);
    } catch (error) {
      console.error("Error al notificar la compactacion a juzgado:", error.message);
    }
    }

    res.status(200).json(response);
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};


module.exports = { postCompactadoController };
