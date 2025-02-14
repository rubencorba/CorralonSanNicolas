const server = require("./src/app");
const { conn } = require('./src/db.js');
const PORT = 3001;



conn.sync({/*  alter: true  */}).then(() => {      /* En alter true, para que no se pierdan los datos */
server.listen(PORT, () => {
  console.log(`Server listening on port ${PORT}`);
})
}).catch(error => console.error(error))
