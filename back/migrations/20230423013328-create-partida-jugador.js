'use strict';
/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.createTable('partidasjugadores', {
      id_jugador: {
        type: Sequelize.BIGINT,
        allowNull: false,
      },
      id_partida: {
        type: Sequelize.BIGINT,
        allowNull: false,
      },
      llaves: {
        type: Sequelize.INTEGER,
        default: 0,
      },
      fallos: {
        type: Sequelize.INTEGER,
        default: 0,
      },
      activo: {
        type: Sequelize.INTEGER,
        default: 1,
      },
      rol: {
        type: Sequelize.STRING,
        default: 'marinero',
      },
    });
  },
  async down(queryInterface, Sequelize) {
    await queryInterface.dropTable('partidasjugadores');
  }
};