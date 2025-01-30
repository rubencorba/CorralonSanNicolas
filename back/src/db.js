const { Sequelize } = require('sequelize');
require('dotenv').config();

const conn = new Sequelize(process.env.DB_NAME, process.env.DB_USER, process.env.DB_PASS, {
  host: process.env.DB_HOST,
  dialect: 'mysql'
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

const { Actas } = conn.models;
const { Infracciones } = conn.models;
const { Users } = conn.models;
const { Vehiculos } = conn.models;
const { Compactados } = conn.models;
const { Egresos } = conn.models;
const { Infractores } = conn.models;
const { Secuestros } = conn.models;
const { Secuestros_infracciones } = conn.models;

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


module.exports = { 
    ...conn.models,
    conn
 };