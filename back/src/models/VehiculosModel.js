const { DataTypes } = require('sequelize');
// Exportamos una funcion que define el modelo
// Luego le injectamos la conexion a sequelize.
module.exports = (sequelize) => {
  // defino el modelo
  sequelize.define('Vehiculos', {
    _id:{
      type:DataTypes.STRING,
      allowNull: false,
      primaryKey:true,
      /* autoIncrement:true */
    },
    dominio: {
      type: DataTypes.STRING,
      allowNull: true,
      
    },
    tipovh:{
      type:DataTypes.STRING,
      allowNull:true,
      
    },
    marcavh:{
      type:DataTypes.STRING,
      allowNull:true,
      
    },
    modelovh:{
      type:DataTypes.STRING,
      allowNull:true,
      
    },
    __v:{
        type:DataTypes.INTEGER,
        allowNull:true
      },
    
  },
  {timestamps:false});
};