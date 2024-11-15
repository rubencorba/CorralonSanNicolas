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
      type:DataTypes.STRING,
      allowNull:true,
    },
    password:{
      type:DataTypes.STRING,
      allowNull:true,
    },
    date:{
      type:DataTypes.DATE,
      allowNull:true,
    },
  },
  {timestamps:false});
};