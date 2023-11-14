const Sequelize = require('sequelize')
const db = new Sequelize("db_edocs", "root", "", {
    host: "localhost",
    dialect: "mysql",
    logging: false
});

db.authenticate()
    .then(() => console.log('Database has been connected'))
    .catch((err) => console.log('Unable to connect to the database: ', err.parent));

module.exports = db