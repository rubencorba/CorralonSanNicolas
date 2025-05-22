const { DataTypes } = require('sequelize');

module.exports = (sequelize) => {
  // defino el modelo
  sequelize.define('Secuestros', {
    id:{
      type:DataTypes.INTEGER,
      allowNull: false,
      primaryKey:true,
      autoIncrement:true
    },
    foto:{
      type:DataTypes.TEXT,
      allowNull:true,
    },
    sector:{
      type:DataTypes.TEXT,
      allowNull:true
    },
    inventario:{
      type:DataTypes.TEXT,
      allowNull:true
    },
    ingreso:{
      type:DataTypes.DOUBLE,
      allowNull:true
    },
    fecha_hora:{
      type:DataTypes.DOUBLE,
      allowNull:true
    },estado: {
      type: DataTypes.TEXT,
      allowNull: true, 
    },
    infracciones: {
      type: DataTypes.JSON,
      allowNull: true,
    }

  }, {
    tableName: "secuestros",
    timestamps:false
  },
  );
};
