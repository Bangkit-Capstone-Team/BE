'use strict';

const {encrypt} = require('../../helper/bcrypt')

/** @type {import('sequelize-cli').Migration} */
module.exports = module.exports = {
  up: async (queryInterface, Sequelize) => {
    return queryInterface.bulkInsert('Users', [
      {
        name: 'ilham',
        username: 'ilham123',
        password: encrypt('testcapstone'),
        email: 'ilham354@gmail.com',
        address: 'medan',
        birth_date: '2002-08-05',
        phone_number: '0823535',
        type_role: 'admin',
      },
      {
        name: 'windi',
        username: 'windi89',
        password: encrypt('admin'),
        email: 'windi@gmail.com',
        address: 'selong',
        birth_date: '2002-08-05',
        phone_number: '0823535',
        type_role: 'admin',
      },
      {
        name: 'jhon',
        username: 'jhon',
        password: encrypt('jhon'),
        email: 'jhon@gmail.com',
        address: 'selong',
        birth_date: '2002-08-05',
        phone_number: '0823535',
        type_role: 'user',
      },
      {
        name: 'jhon2',
        username: 'jhon2',
        password: encrypt('jhon2'),
        email: 'jhon2@gmail.com',
        address: 'selong',
        birth_date: '2002-08-05',
        phone_number: '0823535',
        type_role: 'user',
      },
    ]);
  },
  down: async (queryInterface, Sequelize) => {
    return queryInterface.bulkDelete('Users', null, {});
  },
};
