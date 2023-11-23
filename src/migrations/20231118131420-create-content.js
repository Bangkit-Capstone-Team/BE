'use strict';
/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.createTable('Contents', {
      id_content: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: Sequelize.INTEGER
      },
      id_creator: {
        type: Sequelize.INTEGER
      },
      type_content: {
        type: Sequelize.BOOLEAN
      },
      title: {
        type: Sequelize.TEXT
      },
      thumbnail: {
        type: Sequelize.STRING
      },
      description: {
        type: Sequelize.TEXT
      },
      source: {
        type: Sequelize.STRING
      },
      status: {
        type: Sequelize.BOOLEAN
      },
      createdAt: {
        allowNull: false,
        type: Sequelize.DATE
      },
    });
  },
  async down(queryInterface, Sequelize) {
    await queryInterface.dropTable('Contents');
  }
};