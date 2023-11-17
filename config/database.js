const Sequelize = require('sequelize')

const db = process.env.DB_DATABASE
const user = process.env.DB_USERNAME
const pass = process.env.DB_PASSWORD      

const database = new Sequelize(db, user, pass, {
  host: process.env.DB_HOST,
  dialect: process.env.DB_CONNECTION,
  logging: false,
});

database.authenticate()
    .then(() => console.log('Database has been connected'))
    .catch((err) => console.log('Unable to connect to the database: ', err.parent));

module.exports = database