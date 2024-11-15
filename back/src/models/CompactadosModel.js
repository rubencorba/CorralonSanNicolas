const { DataTypes } = require('sequelize');
// Exportamos una funcion que define el modelo
// Luego le injectamos la conexion a sequelize.
module.exports = (sequelize) => {
  // defino el modelo
  sequelize.define('Compactados', {
    _id:{
      type:DataTypes.STRING,
      allowNull: false,
      primaryKey:true,
      /* autoIncrement:true */
    },
    fecha_hora: {
      type: DataTypes.INTEGER,
      allowNull: true,
      
    },
    /* inspector:{
      type:DataTypes.INTEGER,
      allowNull:true,
      
    }, */
    
  },
  {timestamps:false});
};