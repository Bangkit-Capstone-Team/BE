'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class User extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
    }
  }
  User.init(
    {
      id_user: {
        type: DataTypes.INTEGER,
        primaryKey: true,
      },
      name: DataTypes.STRING(100),
      username: DataTypes.STRING(100),
      password: DataTypes.STRING,
      email: DataTypes.STRING,
      address: DataTypes.TEXT,
      birth_date: DataTypes.DATE,
      phone_number: DataTypes.STRING,
      type_role: DataTypes.STRING,
    },
    {
      sequelize,
      modelName: 'Users',
      freezeTableName: true,
      timestamps: false,
    }
  );
  return User;
};