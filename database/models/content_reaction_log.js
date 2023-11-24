'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class Content_reaction_log extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
    }
  }
  Content_reaction_log.init(
    {
      id_user: DataTypes.INTEGER,
      id_content: DataTypes.INTEGER,
      reaction: DataTypes.TRUE,
    },
    {
      sequelize,
      modelName: 'Content_reaction_log',
      freezeTableName: true,
    }
  );
  return Content_reaction_log;
};