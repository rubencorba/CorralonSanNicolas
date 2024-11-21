const { DataTypes } = require('sequelize');
// Exportamos una funcion que define el modelo
// Luego le injectamos la conexion a sequelize.
module.exports = (sequelize) => {
  // defino el modelo
  sequelize.define('Users', {
    id_mysql:{
      type:DataTypes.INTEGER,
      allowNull: false,
      primaryKey:true,
      autoIncrement:true
    },
    dni: {
      type: DataTypes.TEXT,
      allowNull: true,
    },
    tipo:{
      type:DataTypes.TEXT,
      allowNull:true,
      
    },
    apynom:{
      type:DataTypes.TEXT,
      allowNull:true,
    },
    password:{
      type:DataTypes.TEXT,
      allowNull:true,
    },
    date:{
      type:DataTypes.DATE,
      allowNull:true,
    },
  },
  {timestamps:false});
};