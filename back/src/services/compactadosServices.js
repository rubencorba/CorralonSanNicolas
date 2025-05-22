const { Compactados,Users, Secuestros } = require("../db.js");
const axios = require("axios");
require("dotenv").config();


const postCompactado = async (
    fecha_hora,
    userId,
    idSecuestro,
) => {
  try {

    const convertirFechaATimestamp = (fechaString) => {
        const [dia, mes, añoHora] = fechaString.split("-");
        const [año, hora] = añoHora.split(" ");
        
        // Crear un objeto Date en la zona horaria de Argentina (UTC-3)
        const fecha = new Date(`${año}-${mes}-${dia}T${hora}.000-03:00`);
        
        return fecha.getTime(); // Obtener el timestamp en milisegundos
      };

      const parsedFecha_hora=convertirFechaATimestamp(fecha_hora)

    const newCompactado = await Compactados.create({
        fecha_hora:parsedFecha_hora,

    });

    const user =await Users.findOne({where:{id:userId}})

    await newCompactado.setUser(user);

    // Actualizar el secuestro con el nuevo id de compactado
    await Secuestros.update(
      { compactado: newCompactado.id,
        estado: "Compactado" // Actualizar el estado del secuestro
       }, // Actualizar la columna compactado con el nuevo id
      { where: { id: idSecuestro } } // Filtrar por el id del secuestro correspondiente
    );

    return newCompactado;
  } catch (error) {
    console.error("Error al crear un nuevo compactado:", error.message);
    throw new Error("Error al crear un nuevo compactado en la base de datos.");
  }
};

const notificateCompactacionToJuzgado = async (userId, nroActa, lugar) => {
  try {

    const user = await Users.findOne({ where: { id: userId } });

    if (!user) {
      throw new Error(`No se encontró el usuario con ID: ${userId}`);
    }

    const formData = new URLSearchParams();
    formData.append("user", user.dni);
    formData.append("lugar", lugar);

    const response = await axios.put(
      `${process.env.API_JUZGADO_URL}/corralon/compactar/${nroActa}`,
      formData.toString(),
      {
        headers: {
          "Content-Type": "application/x-www-form-urlencoded",
          Authorization: `Bearer ${process.env.SEARCH_ACTAS_TOKEN}`,
        },
      }
    );

    return response.data;
  } catch (error) {
    console.error("Error al notificar la compactación a Juzgado", error.message);
    throw new Error("Error al llamar al endpoint de juzgado para notificar la compactación.");
  }
};

module.exports = { notificateCompactacionToJuzgado, postCompactado };