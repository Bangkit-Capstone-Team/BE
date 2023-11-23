'use strict';
/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.createTable('Content_reaction_logs', {
      id_reaction: {
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
      reaction: {
        type: Sequelize.BOOLEAN
      },
    });
  },
  async down(queryInterface, Sequelize) {
    await queryInterface.dropTable('Content_reaction_logs');
  }
};