"use strict";
module.exports = {
  up: async (queryInterface, Sequelize) => {
    await queryInterface.createTable("criteria", {
      id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: Sequelize.INTEGER,
      },
      name: {
        type: Sequelize.STRING(30),
      },
      bobot: {
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
    const createdAt = new Date();
    const updatedAt = new Date();
    const data = [
      { name: "Fasilitas", bobot: 0.35, createdAt, updatedAt },
      { name: "Harga Tanah", bobot: 0.25, createdAt, updatedAt },
      { name: "SDM", bobot: 0.25, createdAt, updatedAt },
      { name: "Geologi dan Iklim", bobot: 0.15, createdAt, updatedAt },
    ];
    await queryInterface.bulkInsert("criteria", data);
  },
  down: async (queryInterface, Sequelize) => {
    await queryInterface.dropTable("criteria");
  },
};
