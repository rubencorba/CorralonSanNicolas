const { DataTypes } = require('sequelize');
// Exportamos una funcion que define el modelo
// Luego le injectamos la conexion a sequelize.
module.exports = (sequelize) => {
  // defino el modelo
  sequelize.define('Actas', {
    _id:{
      type:DataTypes.STRING,
      allowNull: false,
      primaryKey:true,
      /* autoIncrement:true */
    },
    cords: {
      type: DataTypes.INTEGER,
      allowNull: true,
    },
    nro:{
      type:DataTypes.STRING,
      allowNull:true,
      
    },
    inspector:{
      type:DataTypes.INTEGER,
      allowNull:true
    },
    lugar:{
      type:DataTypes.STRING,
      allowNull:true
    },
    fecha_hora:{
      type:DataTypes.DOUBLE,
      allowNull:true
    },
  },
  {timestamps:false});
};