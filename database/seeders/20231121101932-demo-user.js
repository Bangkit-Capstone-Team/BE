'use strict';

const bcrypt = require('bcrypt')

/** @type {import('sequelize-cli').Migration} */
module.exports = module.exports = {
  up: async (queryInterface, Sequelize) => {
    return queryInterface.bulkInsert('Users', [
      {
        name: 'ilham',
        username: 'ilham123',
        password: bcrypt.hashSync('testcapstone', bcrypt.genSaltSync(10)),
        email: 'ilham354@gmail.com',
        address: 'medan',
        birth_date: '2002-08-05',
        phone_number: '0823535',
        type_role: 'admin',
      },
      {
        name: 'windi',
        username: 'windi89',
        password: bcrypt.hashSync('admin', bcrypt.genSaltSync(10)),
        email: 'windi@gmail.com',
        address: 'selong',
        birth_date: '2002-08-05',
        phone_number: '0823535',
        type_role: 'admin',
      },
      {
        name: 'jhon',
        username: 'jhon',
        password: bcrypt.hashSync('jhon', bcrypt.genSaltSync(10)),
        email: 'jhon@gmail.com',
        address: 'selong',
        birth_date: '2002-08-05',
        phone_number: '0823535',
        type_role: 'user',
      },
      {
        name: 'jhon2',
        username: 'jhon2',
        password: bcrypt.hashSync('jhon2', bcrypt.genSaltSync(10)),
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
