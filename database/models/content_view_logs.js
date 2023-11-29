'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class Content_view_log extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
    }
  }
  Content_view_log.init({
    id_user: DataTypes.INTEGER,
    id_content: DataTypes.INTEGER,
    source: DataTypes.STRING,
    createdAt: DataTypes.DATE
  }, {
    sequelize,
    timestamps: false,
    freezeTableName: true,
    modelName: 'Content_view_logs',
  });
  return Content_view_log;
};