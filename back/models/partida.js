'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class Partida extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
    }
  }
  Partida.init({
    llaves: DataTypes.INTEGER,
    anfitrion: DataTypes.INTEGER,
    tiempo: DataTypes.INTEGER,
    estado: DataTypes.STRING,
    resultado: DataTypes.STRING
  }, {
    sequelize,
    modelName: 'Partida',
    tableName: 'partidas',
  });
  return Partida;
};