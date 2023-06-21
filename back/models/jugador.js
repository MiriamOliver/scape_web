'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class Jugador extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      Jugador.hasMany(models.PartidaJugador, {
        as: 'PartidasJugadores', 
        foreignKey: 'id_jugador',
      });
    }
  }
  Jugador.init({
    ganadas: DataTypes.INTEGER,
    perdidas: DataTypes.INTEGER,
    partidas: DataTypes.INTEGER,
    llaves: DataTypes.INTEGER,
    activo: DataTypes.INTEGER
  }, {
    sequelize,
    modelName: 'Jugador',
    tableName: 'jugadores',
    timestamps: false
  });
  return Jugador;
};