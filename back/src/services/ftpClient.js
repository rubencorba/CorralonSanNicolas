const ftp = require("basic-ftp");

class FTPClient {
  constructor() {
    this.client = new ftp.Client();
    this.client.ftp.verbose = true; // Para ver logs en consola (puedes desactivarlo después)
  }

  async connect() {
    try {
      await this.client.access({
        host: process.env.FTP_HOST, // Dirección del servidor FTP
        user: process.env.FTP_USER, // Usuario FTP
        password: process.env.FTP_PASSWORD, // Contraseña FTP
        secure: false, // Cambiar a true si el servidor usa FTPS
      });
      console.log("✅ Conectado al servidor FTP");
    } catch (error) {
      console.error("❌ Error al conectar con el servidor FTP:", error);
    }
  }

  async uploadFile(localPath, remotePath) {
    try {
      await this.client.uploadFrom(localPath, remotePath);
      console.log(`✅ Archivo subido a: ${remotePath}`);
    } catch (error) {
      console.error("❌ Error al subir archivo:", error);
    }
  }

  async close() {
    await this.client.close();
  }
}

module.exports = new FTPClient();
