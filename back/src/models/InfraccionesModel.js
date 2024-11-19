const { DataTypes } = require('sequelize');
// Exportamos una funcion que define el modelo
// Luego le injectamos la conexion a sequelize.
module.exports = (sequelize) => {
  // defino el modelo
  sequelize.define('Infracciones', {
    _id:{
      type:DataTypes.STRING,
      allowNull: false,
      primaryKey:true,
      /* autoIncrement:true */
    },
    id_mysql: {
      type: DataTypes.INTEGER,
      allowNull: true,
      /* unique:true */
    },
    descrip:{
      type:DataTypes.TEXT,
      allowNull:true,
      /* validate: {
        max: 5,
        min: 1,
      } */
    },
    digesto:{
      type:DataTypes.TEXT,
      allowNull:true,
    },
    tipo:{
      type:DataTypes.DOUBLE,
      allowNull:true,
    },
  },
  {timestamps:false});
};