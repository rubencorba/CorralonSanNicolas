const { DataTypes } = require('sequelize');
// Exportamos una funcion que define el modelo
// Luego le injectamos la conexion a sequelize.
module.exports = (sequelize) => {
  // defino el modelo
  sequelize.define('Secuestros', {
    id_mysql:{
      type:DataTypes.INTEGER,
      allowNull: false,
      primaryKey:true,
      autoIncrement:true
    },
    /* infraccion_0_id: {
      type: DataTypes.STRING,
      allowNull: true,
    },
    infraccion_1_id: {
      type: DataTypes.STRING,
      allowNull: true,
    },
    infraccion_2_id: {
      type: DataTypes.STRING,
      allowNull: true,
    },
    infraccion_3_id: {
      type: DataTypes.STRING,
      allowNull: true,
    },
    infraccion_0: {
      type: DataTypes.STRING,
      allowNull: true,
    },
    infraccion_1: {
      type: DataTypes.STRING,
      allowNull: true,
    },
    infraccion_2: {
      type: DataTypes.STRING,
      allowNull: true,
    },
    infraccion_3: {
      type: DataTypes.STRING,
      allowNull: true,
    }, */
    /* acta_mysql: {
      type: DataTypes.INTEGER,
      allowNull: true,
    }, */
    foto:{
      type:DataTypes.TEXT,
      allowNull:true,
    },
    vehiculo_mysql:{
      type:DataTypes.INTEGER,
      allowNull:true
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
    },
    egreso_mysql: {
        type: DataTypes.INTEGER,
        allowNull: true,
    },
    infractor_mysql:{
      type:DataTypes.INTEGER,
      allowNull:true
    },
    compactado_mysql:{
      type:DataTypes.INTEGER,
      allowNull:true
    },
    
  },
  {timestamps:false});
};