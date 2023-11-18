'use strict';

/** @type {import('sequelize-cli').Migration} */
module.exports = module.exports = {
  up: (queryInterface, Sequelize) => {
    return queryInterface.bulkInsert('User', [{
      name: "ilham",
      username: "ilham123",
      password: "testcapstone",
      email: "ilham354@gmail.com",
      address: "medan",
      birth_date: '',
      phone_number: +623535,
      createdAt: new Date(),
      updatedAt: new Date()
    }]);
  },
  down: (queryInterface, Sequelize) => {
    return queryInterface.bulkDelete('User', null, {});
  }
};