'use strict';
/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.createTable('partidas', {
      id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: Sequelize.INTEGER
      },
      llaves: {
        type: Sequelize.INTEGER
      },
      anfitrion: {
        type: Sequelize.INTEGER
      },
      tiempo: {
        type: Sequelize.STRING
      },
      estado: {
        type: Sequelize.STRING
      },
      resultado: {
        type: Sequelize.STRING
      },
      createdAt: {
        allowNull: false,
        type: Sequelize.DATE
      },
      updatedAt: {
        type: Sequelize.DATE
      }
    });
  },
  async down(queryInterface, Sequelize) {
    await queryInterface.dropTable('partidas');
  }
};