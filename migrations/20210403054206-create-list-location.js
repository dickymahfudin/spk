"use strict";
module.exports = {
  up: async (queryInterface, Sequelize) => {
    await queryInterface.createTable("list_locations", {
      id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: Sequelize.INTEGER,
      },
      name: {
        type: Sequelize.STRING(25),
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

    // const result = new Array(5).fill(null).map((data) => {
    //   return { name: "A", createdAt: new Date(), updatedAt: new Date() };
    // });

    // await queryInterface.bulkInsert("list_locations", result);
  },
  down: async (queryInterface, Sequelize) => {
    await queryInterface.dropTable("list_locations");
  },
};
