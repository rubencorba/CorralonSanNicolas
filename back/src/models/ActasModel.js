const { DataTypes } = require('sequelize');
// Exportamos una funcion que define el modelo
// Luego le injectamos la conexion a sequelize.
module.exports = (sequelize) => {
  // defino el modelo
  sequelize.define('Actas', {
    id:{
      type:DataTypes.INTEGER,
      allowNull: false,
      primaryKey:true,
      autoIncrement:true
    },
    coordinada0: {
      type: DataTypes.DOUBLE,
      allowNull: true,
    },
    coordinada1: {
      type: DataTypes.DOUBLE,
      allowNull: true,
    },
    /* tipoDeCoordinada: {
      type: DataTypes.TEXT,
      allowNull: true,
    }, */
    nro:{
      type:DataTypes.INTEGER,
      allowNull:true,
      
    },
    inspector:{
      type:DataTypes.INTEGER,
      allowNull:true
    },
    lugar:{
      type:DataTypes.TEXT,
      allowNull:true
    },
    fecha_hora:{
      type:DataTypes.DOUBLE,
      allowNull:true
    },
  }, {
    tableName: "actas",  // Asegura que use minúsculas
    timestamps:false
  },
  );
};