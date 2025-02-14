const { DataTypes } = require('sequelize');
// Exportamos una funcion que define el modelo
// Luego le injectamos la conexion a sequelize.
module.exports = (sequelize) => {
  // defino el modelo
  sequelize.define('Secuestros_infracciones', {
    id:{
      type:DataTypes.INTEGER,
      allowNull: false,
      primaryKey:true,
      autoIncrement:true
    },
    secuestro_id: {
      type: DataTypes.INTEGER,
      allowNull: true,
    },
    infraccion_id:{
      type:DataTypes.INTEGER,
      allowNull:true,
      
    },
    
  }, {
    tableName: "secuestros_infracciones",
    timestamps:true
  },
  );
};