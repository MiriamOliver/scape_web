'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class PartidaJugador extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
    }
  }
  PartidaJugador.init({
    id_jugador: DataTypes.BIGINT,
    id_partida: DataTypes.BIGINT,
    llaves: DataTypes.INTEGER,
    fallos: DataTypes.INTEGER,
    activo: DataTypes.INTEGER,
    rol: DataTypes.STRING
  }, {
    sequelize,
    modelName: 'PartidaJugador',
    tableName: 'partidasjugadores',
    timestamps: false
  });

  PartidaJugador.removeAttribute('id');

  return PartidaJugador;
};