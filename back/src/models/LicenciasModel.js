const { DataTypes } = require("sequelize");

module.exports = (sequelize) => {
  sequelize.define(
    "Licencia",
    {
      id: {
        type: DataTypes.INTEGER,
        allowNull: false,
        primaryKey: true,
        autoIncrement: true,
      },
      numero: {
        type: DataTypes.BIGINT,
        allowNull: false
      },
      dni: {
        type: DataTypes.STRING(15),
        allowNull: false,
      },
      nombre: {
        type: DataTypes.STRING(100),
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
      egresada: {
        type: DataTypes.INTEGER,
        allowNull: true,
      },
      observaciones: {
        type: DataTypes.TEXT,
        allowNull: true,
      },
      foto: {
        type: DataTypes.STRING,
        allowNull: true,
      },
      tipo: {
        type: DataTypes.ENUM("auto", "moto", "profesional", "otro"),
        allowNull: true,
      },
    },
    {
      tableName: "licencias",
      timestamps: false,
    }
  );
};
