'use strict';
/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.createTable('Enigmas', {
      id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: Sequelize.INTEGER
      },
      pregunta: {
        type: Sequelize.STRING
      },
      resp_uno: {
        type: Sequelize.STRING
      },
      resp_dos: {
        type: Sequelize.STRING
      },
      resp_tres: {
        type: Sequelize.STRING
      },
      resp_correcta: {
        type: Sequelize.STRING
      },
      createdAt: {
        allowNull: false,
        type: Sequelize.DATE
      },
      updatedAt: {
        allowNull: false,
        type: Sequelize.DATE
      }
    });
  },
  async down(queryInterface, Sequelize) {
    await queryInterface.dropTable('Enigmas');
  }
};