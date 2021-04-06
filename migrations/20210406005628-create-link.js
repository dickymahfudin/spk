"use strict";
module.exports = {
  up: async (queryInterface, Sequelize) => {
    await queryInterface.createTable("links", {
      id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: Sequelize.INTEGER,
      },
      user_id: {
        type: Sequelize.INTEGER,
        allowNull: false,
        references: {
          model: "users",
          key: "id",
        },
        onUpdate: "cascade",
        onDelete: "cascade",
      },
      criteria_id: {
        type: Sequelize.INTEGER,
        allowNull: false,
        references: {
          model: "criteria",
          key: "id",
        },
        onUpdate: "cascade",
        onDelete: "cascade",
      },
      location_id: {
        type: Sequelize.INTEGER,
        allowNull: false,
        references: {
          model: "list_locations",
          key: "id",
        },
        onUpdate: "cascade",
        onDelete: "cascade",
      },
      value: {
        type: Sequelize.FLOAT,
      },
      createdAt: {
        allowNull: false,
        type: Sequelize.DATE,
      },
      updatedAt: {
        allowNull: false,
        type: Sequelize.DATE,
      },
    });
  },
  down: async (queryInterface, Sequelize) => {
    await queryInterface.dropTable("links");
  },
};
