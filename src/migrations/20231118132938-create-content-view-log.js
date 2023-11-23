'use strict';
/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.createTable('content_view_logs', {
      id_viewer: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: Sequelize.INTEGER
      },
      id_user: {
        type: Sequelize.INTEGER
      },
      id_content: {
        type: Sequelize.INTEGER
      },
      source: {
        type: Sequelize.STRING(10)
      },
    });
  },
  async down(queryInterface, Sequelize) {
    await queryInterface.dropTable('content_view_logs');
  }
};