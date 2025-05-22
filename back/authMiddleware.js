const jwt = require("jsonwebtoken");

const verificarToken = (req, res, next) => {
  const token = req.header("Authorization"); // Leer el token del encabezado de la solicitud
  if (!token) return res.status(401).json({ message: "Acceso denegado, token no proporcionado" });

  try {
    const verified = jwt.verify(token, process.env.JWT_SECRET); // Verifica el token
    req.user = verified; // Agrega los datos del token a `req.user` para usarlos en el controlador si es necesario
    next(); // Continúa con el siguiente middleware/controlador
  } catch (err) {
    // Si falla, verificar si es un token fijo autorizado
    if (token === process.env.FIXED_API_TOKEN) {
      return next();
    }
    res.status(403).json({ message: "Token inválido o expirado" });
  };
};

module.exports = verificarToken;
