const { DataTypes } = require('sequelize');
// Exportamos una funcion que define el modelo
// Luego le injectamos la conexion a sequelize.
module.exports = (sequelize) => {
  // defino el modelo
  sequelize.define('Vehiculos', {
    id:{
      type:DataTypes.INTEGER,
      allowNull: false,
      primaryKey:true,
      autoIncrement:true
    },
    dominio: {
      type: DataTypes.TEXT,
      allowNull: true,
      
    },
    tipovh:{
      type:DataTypes.TEXT,
      allowNull:true,
      
    },
    marcavh:{
      type:DataTypes.TEXT,
      allowNull:true,
      
    },
    modelovh:{
      type:DataTypes.TEXT,
      allowNull:true,
      
    },
    
  },
  {timestamps:false});
};