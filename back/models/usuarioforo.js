'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class UsuarioForo extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
    }
  }
  UsuarioForo.init({
    id_user: DataTypes.INTEGER
  }, {
    sequelize,
    modelName: 'UsuarioForo',
    tableName: 'usuarioforos',
  });
  return UsuarioForo;
};