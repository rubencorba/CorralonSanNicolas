/* const multer = require("multer");
const path = require("path");

// Configuración del almacenamiento en memoria (se guardará temporalmente antes de subirlo al FTP)
const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, "uploads/"); // Carpeta temporal donde se guardará la imagen
  },
  filename: (req, file, cb) => {
    cb(null, Date.now() + path.extname(file.originalname)); // Se genera un nombre único
  },
});

const upload = multer({ storage });

module.exports = upload; */
