"use strict";
const { Model } = require("sequelize");
module.exports = (sequelize, DataTypes) => {
  class nilai extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      this.belongsTo(models.criteria, {
        foreignKey: "criteria_id",
        as: "criteria",
      });
      this.belongsTo(models.list_location, {
        foreignKey: "location_id",
        as: "location",
      });
    }
    static async getAll(user_id) {
      return await this.findAll({
        where: { user_id },
        include: [
          {
            model: sequelize.models.criteria,
            as: "criteria",
          },
          {
            model: sequelize.models.list_location,
            as: "location",
          },
        ],
        order: [
          ["location_id", "ASC"],
          ["criteria_id", "ASC"],
        ],
        attributes: { exclude: ["createdAt", "updatedAt"] },
      })
        .then((result) => result)
        .catch((err) => err);
    }
  }

  nilai.init(
    {
      user_id: DataTypes.INTEGER,
      location_id: DataTypes.INTEGER,
      criteria_id: DataTypes.INTEGER,
      name: DataTypes.STRING,
      value: DataTypes.FLOAT,
    },
    {
      sequelize,
      modelName: "nilai",
    }
  );
  return nilai;
};
