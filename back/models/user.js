'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class User extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      User.hasMany(models.RolesAsignados, {
        as: 'RolesAsignados', 
        foreignKey: 'id_user',
      });

      User.hasMany(models.Jugador, {
        as: 'Jugador', 
        foreignKey: 'id',
      });

      User.hasMany(models.Partida, {
        as: 'PartidasUsuarios', 
        foreignKey: 'anfitrion',
      });

      User.hasMany(models.PartidaJugador, {
        as: 'PartidasJugadores', 
        foreignKey: 'id_jugador',
      });
    }
  }
  User.init({
    nombre: DataTypes.STRING,
    email: DataTypes.STRING,
    password: DataTypes.STRING,
    avatar: DataTypes.STRING,
    cod_passwd: DataTypes.STRING,
    conectado: DataTypes.INTEGER,
    habilitado: DataTypes.INTEGER,
    verifiedAt: DataTypes.DATE
  }, {
    sequelize,
    modelName: 'User',
    tableName: 'users',
  });
  return User;
};