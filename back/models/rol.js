'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class Rol extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      Rol.hasOne(models.RolesAsignados, {
        as: 'RolesAsignados', 
        foreignKey: 'id_rol',
        targetKey: 'id'
      });
    }
  }
  Rol.init({
    rol: DataTypes.STRING
  }, {
    sequelize,
    modelName: 'Rol',
    tableName: 'roles',
    timestamps: false
  });
  return Rol;
};