'use strict';

const { v4: uuidv4 } = require('uuid');

module.exports = {
  up: async (queryInterface, Sequelize) => {
    await queryInterface.createTable('Roles', {
      id: {
        allowNull: false,
        primaryKey: true,
        type: Sequelize.UUID
      },
      name: {
        type: Sequelize.STRING(128)
      },
      displayName: {
        type: Sequelize.STRING(256)
      },
      createdAt: {
        allowNull: false,
        type: Sequelize.DATE
      },
      updatedAt: {
        allowNull: false,
        type: Sequelize.DATE
      }
    });
  },
  down: async (queryInterface, Sequelize) => {
    await queryInterface.dropTable('Roles');
  }
};