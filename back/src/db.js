const { Sequelize } = require('sequelize');
require('dotenv').config();

const conn = new Sequelize(process.env.DB_NAME, process.env.DB_USER, process.env.DB_PASS, {
  host: process.env.DB_HOST,
  dialect: 'mysql',
  define: {
    freezeTableName: true, // Evita pluralización automática
    underscored: false, // Convierte nombres a snake_case
  }
});


const fs = require('fs');
const path = require('path');

const basename = path.basename(__filename);

const modelDefiners = [];

fs.readdirSync(path.join(__dirname, '/models'))
  .filter((file) => (file.indexOf('.') !== 0) && (file !== basename) && (file.slice(-3) === '.js'))
  .forEach((file) => {
    modelDefiners.push(require(path.join(__dirname, '/models', file)));
  });


modelDefiners.forEach(model => model(conn));

let entries = Object.entries(conn.models);
let capsEntries = entries.map((entry) => [entry[0][0].toUpperCase() + entry[0].slice(1), entry[1]]);
conn.models = Object.fromEntries(capsEntries);


//Relaciones

const { Actas, Infracciones, Users, Vehiculos, Compactados, Egresos, Infractores, Secuestros, Secuestros_infracciones, Licencia, LicenciaEgresada } = conn.models;

/* Secuestros.belongsToMany(Infracciones, {through: 'secuestros_infracciones'});
Infracciones.belongsToMany(Secuestros, {through: 'secuestros_infracciones'}); */

Actas.hasOne(Secuestros, { foreignKey: 'acta' });
Secuestros.belongsTo(Actas, { foreignKey: 'acta' });

Vehiculos.hasOne(Secuestros, { foreignKey: 'vehiculo' });
Secuestros.belongsTo(Vehiculos, { foreignKey: 'vehiculo' });

Infractores.hasOne(Secuestros, { foreignKey: 'infractor' });
Secuestros.belongsTo(Infractores, { foreignKey: 'infractor' });

Compactados.hasOne(Secuestros, { foreignKey: 'compactado' });
Secuestros.belongsTo(Compactados, { foreignKey: 'compactado' });

Egresos.hasOne(Secuestros, { foreignKey: 'egreso' });
Secuestros.belongsTo(Egresos, { foreignKey: 'egreso' });

Users.hasMany(Secuestros, { foreignKey: 'user' }); //Un usuario puede ingresar muchos
Secuestros.belongsTo(Users, { foreignKey: 'user' });

Users.hasMany(Compactados, { foreignKey: 'user' }); //Un usuario puede compactar muchos
Compactados.belongsTo(Users, { foreignKey: 'user' });

Users.hasMany(Egresos, { foreignKey: 'user' }); //Un usuario puede egresar muchos
Egresos.belongsTo(Users, { foreignKey: 'user' });

//******Tabla intermedia Secuestros_infracciones***********
Secuestros.hasOne(Secuestros_infracciones, { foreignKey: 'secuestro_id' });
Secuestros_infracciones.belongsTo(Secuestros, { foreignKey: 'secuestro_id' });

Infracciones.hasOne(Secuestros_infracciones, { foreignKey: 'infraccion_id' });
Secuestros_infracciones.belongsTo(Infracciones, { foreignKey: 'infraccion_id' });

//---------Licencias---------//

// Un usuario puede ingresar varias licencias
Users.hasMany(Licencia, { foreignKey: "user" });
Licencia.belongsTo(Users, { foreignKey: "user" });

// Una licencia puede estar egresada con una LicenciaEgresada
Licencia.hasOne(LicenciaEgresada, { foreignKey: "licencia_id", onDelete: "CASCADE" });
LicenciaEgresada.belongsTo(Licencia, { foreignKey: "licencia_id" });

// Un usuario es responsable de registrar la egresión de una licencia
Users.hasMany(LicenciaEgresada, { foreignKey: "user" });
LicenciaEgresada.belongsTo(Users, { foreignKey: "user" });


module.exports = { 
    ...conn.models,
    conn
 };