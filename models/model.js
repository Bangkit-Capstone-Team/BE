const db = require('../config/database')
const { DataTypes } = require('sequelize')

const model = db.define('products', {
  id_product: {
    type: DataTypes.INTEGER,
    primaryKey: true,
    autoIncrement: true
  },
  nama: {
    type: DataTypes.STRING(100),
  },
  nomor: {
    type: DataTypes.STRING(20),
  },
  email: {
    type: DataTypes.STRING(100),
  },
}, { freezeTableName: true, timestamps: false });

model.sync().then(() => console.log("Syncrhonze model was successfully"))

module.exports = model
