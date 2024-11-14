const { DataTypes } = require('sequelize');
// Exportamos una funcion que define el modelo
// Luego le injectamos la conexion a sequelize.
module.exports = (sequelize) => {
  // defino el modelo
  sequelize.define('Users', {
    _id:{
      type:DataTypes.INTEGER,
      allowNull: false,
      primaryKey:true,
      /* autoIncrement:true */
    },
    dni: {
      type: DataTypes.INTEGER,
      allowNull: true,
      unique:true
    },
    tipo:{
      type:DataTypes.STRING,
      allowNull:true,
      
    },
    apynom:{
      /* type:DataTypes.INTEGER,
      allowNull:true */
    },
    password:{
      /* type:DataTypes.ENUM('verano','otoño','invierno','primavera'),
      allowNull:false */
    },
    date:{
      /* type:DataTypes.ENUM('verano','otoño','invierno','primavera'),
      allowNull:false */
    },
  },
  {timestamps:false});
};