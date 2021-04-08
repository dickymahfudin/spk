"use strict";
module.exports = {
  up: async (queryInterface, Sequelize) => {
    await queryInterface.createTable("users", {
      id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: Sequelize.INTEGER,
      },
      name: {
        type: Sequelize.STRING(30),
      },
      username: {
        type: Sequelize.STRING(20),
      },
      password: {
        type: Sequelize.STRING,
      },
      status: {
        allowNull: false,
        type: Sequelize.BOOLEAN,
        defaultValue: false,
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

    // const createdAt = new Date();
    // const updatedAt = new Date();

    // await queryInterface.bulkInsert("users", [
    //   {
    //     name: "dism",
    //     username: "dism",
    //     password: "123",
    //     createdAt,
    //     updatedAt,
    //   },
    // ]);
  },
  down: async (queryInterface, Sequelize) => {
    await queryInterface.dropTable("users");
  },
};
