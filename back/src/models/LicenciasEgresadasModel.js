const { DataTypes } = require("sequelize");

module.exports = (sequelize) => {
  sequelize.define(
    "LicenciaEgresada",
    {
      id: {
        type: DataTypes.INTEGER,
        allowNull: false,
        primaryKey: true,
        autoIncrement: true,
      },
      licencia_id: {
        type: DataTypes.INTEGER,
        allowNull: false,
      },
      firma: {
        type: DataTypes.TEXT("long"),
        allowNull: false,
      },
      fecha_hora: {
        type: DataTypes.DATE,
        defaultValue: DataTypes.NOW,
      },
      user: {
        type: DataTypes.INTEGER,
        allowNull: false,
      },
    },
    {
      tableName: "licencias_egresadas",
      timestamps: false,
    }
  );
};
