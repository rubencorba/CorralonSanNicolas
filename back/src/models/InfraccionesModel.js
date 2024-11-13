const { DataTypes } = require('sequelize');
// Exportamos una funcion que define el modelo
// Luego le injectamos la conexion a sequelize.
module.exports = (sequelize) => {
  // defino el modelo
  sequelize.define('Infracciones', {
    _id:{
      type:DataTypes.INTEGER,
      allowNull: false,
      primaryKey:true,
      /* autoIncrement:true */
    },
    id_mysql: {
      type: DataTypes.INTEGER,
      allowNull: true,
      unique:true
    },
    descrip:{
      type:DataTypes.STRING,
      allowNull:true,
      /* validate: {
        max: 5,
        min: 1,
      } */
    },
    digesto:{
      /* type:DataTypes.INTEGER,
      allowNull:true */
    },
    _v:{
      /* type:DataTypes.ENUM('verano','otoño','invierno','primavera'),
      allowNull:false */
    },
    tipo:{
      /* type:DataTypes.ENUM('verano','otoño','invierno','primavera'),
      allowNull:false */
    },
  },
  {timestamps:false});
};