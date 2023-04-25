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
        type: Sequelize.INTEGER
      },
      activo: {
        type: Sequelize.INTEGER
      },
      rol: {
        type: Sequelize.STRING
      },
    });
  },
  async down(queryInterface, Sequelize) {
    await queryInterface.dropTable('partidasjugadores');
  }
};