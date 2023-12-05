'use strict';
/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.createTable('Contents', {
      id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: Sequelize.INTEGER(11)
      },
      id_creator: {
        type: Sequelize.INTEGER(11)
      },
      type_content: {
        type: Sequelize.STRING(20)
      },
      title: {
        type: Sequelize.TEXT
      },
      thumbnail: {
        type: Sequelize.STRING(200)
      },
      description: {
        type: Sequelize.TEXT
      },
      source: {
        type: Sequelize.STRING(200)
      },
      status: {
        type: Sequelize.STRING(50)
      },
      id_product: {
        type: Sequelize.INTEGER(11)
      },
      createdAt: {
        allowNull: false,
        type: Sequelize.DATE,
        defaultValue: Sequelize.literal('CURRENT_TIMESTAMP')
      },
    });
  },
  async down(queryInterface, Sequelize) {
    await queryInterface.dropTable('Contents');
  }
};