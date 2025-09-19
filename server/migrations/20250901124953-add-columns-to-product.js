"use strict";

module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.addColumn("Products", "name", {
      type: Sequelize.STRING,
      allowNull: false,
    });
    await queryInterface.addColumn("Products", "description", {
      type: Sequelize.TEXT,
      allowNull: true,
    });
    await queryInterface.addColumn("Products", "price", {
      type: Sequelize.FLOAT,
      allowNull: false,
    });
    await queryInterface.addColumn("Products", "category", {
      type: Sequelize.STRING,
      allowNull: false,
      defaultValue: "Uncategorized", // fallback agar category na di ho
    });
  },

  async down(queryInterface, Sequelize) {
    await queryInterface.removeColumn("Products", "name");
    await queryInterface.removeColumn("Products", "description");
    await queryInterface.removeColumn("Products", "price");
    await queryInterface.removeColumn("Products", "category");
  },
};
