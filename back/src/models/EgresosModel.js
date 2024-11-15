const { DataTypes } = require('sequelize');
// Exportamos una funcion que define el modelo
// Luego le injectamos la conexion a sequelize.
module.exports = (sequelize) => {
  // defino el modelo
  sequelize.define('Egresos', {
    _id:{
      type:DataTypes.INTEGER,
      allowNull: false,
      primaryKey:true,
      /* autoIncrement:true */
    },
    /* inspector: {
      type: DataTypes.INTEGER,
      allowNull: true,
      
    }, */
    apynom:{
      type:DataTypes.STRING,
      allowNull:true,
      
    },
    domicilio:{
      type:DataTypes.STRING,
      allowNull:true
    },
    licencia:{
      type:DataTypes.INTEGER,
      allowNull:true
    },
    fechaHora:{
      type:DataTypes.BIGINT,
      allowNull:true
    },
    tarjetaVerde:{
      type:DataTypes.STRING,
      allowNull:true
    },
    bPago:{
      type:DataTypes.INTEGER,
      allowNull:true
    },
    obs:{
      type:DataTypes.STRING,
      allowNull:true
    },
    __v:{
      type:DataTypes.INTEGER,
      allowNull:true
    },
  },
  {timestamps:false});
};