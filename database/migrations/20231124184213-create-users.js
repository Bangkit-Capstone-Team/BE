'use strict';
/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.createTable('Users', {
      id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: Sequelize.INTEGER
      },
      name: {
        type: Sequelize.STRING(150)
      },
      username: {
        type: Sequelize.STRING(150)
      },
      password: {
        type: Sequelize.STRING(255)
      },
      email: {
        type: Sequelize.STRING(150)
      },
      address: {
        type: Sequelize.TEXT
      },
      birth_date: {
        type: Sequelize.DATE
      },
      phone_number: {
        type: Sequelize.STRING(15)
      },
      type_role: {
        type: Sequelize.STRING(15)
      },
    });
  },
  async down(queryInterface, Sequelize) {
    await queryInterface.dropTable('Users');
  }
};

