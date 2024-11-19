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
      type:DataTypes.TEXT,
      allowNull:true,
      
    },
    sexo:{
      type:DataTypes.TEXT,
      allowNull:true
    },
    cuil:{
      type:DataTypes.TEXT,
      allowNull:true
    },
    
  },
  {timestamps:false});
};