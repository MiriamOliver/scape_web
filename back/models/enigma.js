'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class Enigma extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
    }
  }
  Enigma.init({
    pregunta: DataTypes.STRING,
    resp_uno: DataTypes.STRING,
    resp_dos: DataTypes.STRING,
    resp_tres: DataTypes.STRING,
    resp_correcta: DataTypes.STRING
  }, {
    sequelize,
    modelName: 'Enigma',
    tableName: 'enigmas',
  });
  return Enigma;
};