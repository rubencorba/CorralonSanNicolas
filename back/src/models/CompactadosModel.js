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
    fechaHora: {
      type: DataTypes.DOUBLE,
      allowNull: true,
      
    },
    inspector:{
      type:DataTypes.STRING,
      allowNull:true,
      /* get() {
        const rawValue = this.getDataValue('inspector');
        return rawValue ? rawValue.toString('hex') : null; // Lo conviertes a texto hexadecimal
      }, */
    },
    
  },
  {timestamps:false});
};