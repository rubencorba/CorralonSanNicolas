const { DataTypes } = require('sequelize');
// Exportamos una funcion que define el modelo
// Luego le injectamos la conexion a sequelize.
module.exports = (sequelize) => {
  // defino el modelo
  sequelize.define('Infractores', {
    _id:{
      type:DataTypes.STRING,
      allowNull: false,
      primaryKey:true,
      /* autoIncrement:true */
    },
    dni: {
      type: DataTypes.INTEGER,
      allowNull: true,
      
    },
    apynom:{
      type:DataTypes.STRING,
      allowNull:true,
      
    },
    sexo:{
      type:DataTypes.STRING,
      allowNull:true
    },
    cuil:{
      type:DataTypes.STRING,
      allowNull:true
    },
    __v:{
      type:DataTypes.INTEGER,
      allowNull:true
    },
  },
  {timestamps:false});
};