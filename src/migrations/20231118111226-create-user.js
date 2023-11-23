'use strict';
/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.createTable('Users', {
      id_user: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: Sequelize.INTEGER
      },
      name: {
        type: Sequelize.STRING(100)
      },
      username: {
        type: Sequelize.STRING(100)
      },
      password: {
        type: Sequelize.STRING
      },
      email: {
        type: Sequelize.STRING(100)
      },
      address: {
        type: Sequelize.STRING
      },
      birth_date: {
        type: Sequelize.DATE
      },
      phone_number: {
        type: Sequelize.STRING(15)
      },
      type_role: {
        type: Sequelize.STRING(6)
      },
    });
  },
  async down(queryInterface, Sequelize) {
    await queryInterface.dropTable('Users');
  }
};