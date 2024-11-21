const { DataTypes } = require('sequelize');
// Exportamos una funcion que define el modelo
// Luego le injectamos la conexion a sequelize.
module.exports = (sequelize) => {
  // defino el modelo
  sequelize.define('Infracciones', {
    id_mysql:{
      type:DataTypes.INTEGER,
      allowNull: false,
      primaryKey:true,
    },
    descrip:{
      type:DataTypes.TEXT,
      allowNull:true,
    },
    digesto:{
      type:DataTypes.TEXT,
      allowNull:true,
    },
    tipo:{
      type:DataTypes.DOUBLE,
      allowNull:true,
    },
  },
  {timestamps:false});
};