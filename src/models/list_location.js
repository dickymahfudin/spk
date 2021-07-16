"use strict";
const { Model } = require("sequelize");
module.exports = (sequelize, DataTypes) => {
  class list_location extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
    }
    static async getAll(user_id) {
      return await this.findAll({
        where: { user_id },
        order: [["id", "ASC"]],
        attributes: { exclude: ["createdAt", "updatedAt"] },
      })
        .then((result) => result)
        .catch((err) => err);
    }
  }
  list_location.init(
    {
      user_id: DataTypes.INTEGER,
      name: DataTypes.STRING,
      core: DataTypes.FLOAT,
      secondary: DataTypes.FLOAT,
      hasil: DataTypes.FLOAT,
    },
    {
      sequelize,
      modelName: "list_location",
    }
  );
  return list_location;
};
