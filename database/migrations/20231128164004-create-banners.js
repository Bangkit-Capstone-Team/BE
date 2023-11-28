'use strict';
/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.createTable('Banners', {
      id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: Sequelize.INTEGER
      },
      id: {
        type: Sequelize.INTEGER(11)
      },
      filepath: {
        type: Sequelize.STRING(200)
      },
      id_category: {
        type: Sequelize.INTEGER(11)
      },
    });
  },
  async down(queryInterface, Sequelize) {
    await queryInterface.dropTable('Banners');
  }
};