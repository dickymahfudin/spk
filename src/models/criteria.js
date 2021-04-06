"use strict";
const { Model } = require("sequelize");
module.exports = (sequelize, DataTypes) => {
  class criteria extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
    }
  }
  criteria.init(
    {
      name: DataTypes.STRING,
      bobot: DataTypes.FLOAT,
    },
    {
      sequelize,
      modelName: "criteria",
    }
  );
  return criteria;
};
