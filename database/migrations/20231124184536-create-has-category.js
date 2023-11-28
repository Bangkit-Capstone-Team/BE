'use strict';
/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.createTable('Has_categories', {
      id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: Sequelize.INTEGER(11)
      },
      id_content: {
        type: Sequelize.INTEGER(11)
      },
      id_category: {
        type: Sequelize.INTEGER(11)
      },
    });
  },
  async down(queryInterface, Sequelize) {
    await queryInterface.dropTable('Has_categories');
  }
};