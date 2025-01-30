const { DataTypes } = require('sequelize');
// Exportamos una funcion que define el modelo
// Luego le injectamos la conexion a sequelize.
module.exports = (sequelize) => {
  // defino el modelo
  sequelize.define('Egresos', {
    id:{
      type:DataTypes.INTEGER,
      allowNull: false,
      primaryKey:true,
      autoIncrement:true
    },
    /* inspector:{
      type:DataTypes.INTEGER,
      allowNull:true,
    }, */
    dni:{
      type:DataTypes.INTEGER,
      allowNull:true,
    },
    nombreCompleto:{
      type:DataTypes.TEXT,
      allowNull:true,
      
    },
    domicilio:{
      type:DataTypes.TEXT,
      allowNull:true
    },
    licencia:{
      type:DataTypes.INTEGER,
      allowNull:true
    },
    fecha_hora:{
      type:DataTypes.DOUBLE,
      allowNull:true
    },
    tarjetaVerde:{
      type:DataTypes.TEXT,
      allowNull:true
    },
    bPago:{
      type:DataTypes.INTEGER,
      allowNull:true
    },
    obs:{
      type:DataTypes.TEXT,
      allowNull:true
    },
    
  },
  {timestamps:false});
};