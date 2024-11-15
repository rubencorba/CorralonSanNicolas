const { DataTypes } = require('sequelize');
// Exportamos una funcion que define el modelo
// Luego le injectamos la conexion a sequelize.
module.exports = (sequelize) => {
  // defino el modelo
  sequelize.define('Secuestros', {
    _id:{
      type:DataTypes.STRING,
      allowNull: false,
      primaryKey:true,
      /* autoIncrement:true */
    },
    acta: {
      type: DataTypes.STRING,
      allowNull: true,
      
    },
    foto:{
      type:DataTypes.STRING,
      allowNull:true,
      
    },
    vehiculo:{
      type:DataTypes.STRING(24),
      allowNull:true
    },
    sector:{
      type:DataTypes.STRING,
      allowNull:true
    },
    inventario:{
      type:DataTypes.STRING,
      allowNull:true
    },
    ingreso:{
      type:DataTypes.BIGINT,
      allowNull:true
    },
    fecha_hora:{
      type:DataTypes.BIGINT,
      allowNull:true
    },
    /* egreso: {
        type: DataTypes.INTEGER,
        allowNull: true,
    }, */
    /* infractor:{
      type:DataTypes.STRING,
      allowNull:true
    }, */
    /* compactado:{
      type:DataTypes.STRING,
      allowNull:true
    }, */
    __v:{
      type:DataTypes.INTEGER,
      allowNull:true
    },
  },
  {timestamps:false});
};