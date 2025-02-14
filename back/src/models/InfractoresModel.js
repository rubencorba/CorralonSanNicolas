const { DataTypes } = require('sequelize');
// Exportamos una funcion que define el modelo
// Luego le injectamos la conexion a sequelize.
module.exports = (sequelize) => {
  // defino el modelo
  sequelize.define('Infractores', {
    id:{
      type:DataTypes.INTEGER,
      allowNull: false,
      primaryKey:true,
      autoIncrement:true
    },
    dni: {
      type: DataTypes.INTEGER,
      allowNull: true,
      
    },
    nombreCompleto:{
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
    
  }, {
    tableName: "infractores",
    timestamps:false
  },
  );
};