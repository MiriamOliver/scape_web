'use strict';
/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.createTable('jugadores', {
      id: {
        allowNull: false,
        primaryKey: true,
        type: Sequelize.BIGINT,
      },
      ganadas: {
        type: Sequelize.INTEGER,
        default: 0
      },
      perdidas: {
        type: Sequelize.INTEGER,
        default: 0
      },
      partidas: {
        type: Sequelize.INTEGER,
        default: 0
      },
      llaves: {
        type: Sequelize.INTEGER,
        default: 0
      },
      activo: {
        type: Sequelize.INTEGER
      },
    });
  },
  async down(queryInterface, Sequelize) {
    await queryInterface.dropTable('jugadores');
  }
};