'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class Content extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
    }
  }
  Content.init({
    id_creator: DataTypes.INTEGER,
    type_content: DataTypes.INTEGER,
    title: DataTypes.TEXT,
    thumbnail: DataTypes.STRING,
    description: DataTypes.TEXT,
    source: DataTypes.TEXT,
    status: DataTypes.BOOLEAN
  }, {
    sequelize,
    modelName: 'Content',
  });
  return Content;
};