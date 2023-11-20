const db = require('../config/database')
const { DataTypes } = require('sequelize')

const model = db.define('users',
  {
    id: {
      allowNull: false,
      autoIncrement: true,
      primaryKey: true,
      type: DataTypes.INTEGER,
    },
    name: {
      type: DataTypes.STRING,
    },
    username: {
      type: DataTypes.STRING,
    },
    password: {
      type: DataTypes.STRING,
    },
    email: {
      type: DataTypes.STRING,
    },
    address: {
      type: DataTypes.TEXT,
    },
    birth_date: {
      type: DataTypes.DATE,
    },
    phone_number: {
      type: DataTypes.INTEGER,
    },
    type_role: {
      type: DataTypes.STRING,
    },
  },
  { freezeTableName: true, timestamps: false }
);

model.sync().then(() => console.log("Syncrhonze model was successfully"))

module.exports = model
