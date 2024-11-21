const { DataTypes } = require('sequelize');
// Exportamos una funcion que define el modelo
// Luego le injectamos la conexion a sequelize.
module.exports = (sequelize) => {
  // defino el modelo
  sequelize.define('Compactados', {
    id_mysql:{
      type:DataTypes.INTEGER,
      allowNull: false,
      primaryKey:true,
      autoIncrement:true
    },
    fechaHora: {
      type: DataTypes.DOUBLE,
      allowNull: true,
    },
    inspector_mysql:{
      type:DataTypes.INTEGER,
      allowNull:true,
    },
    
  },
  {timestamps:false});
};