'use strict';

const { v4: uuidv4 } = require('uuid');

module.exports = {
  up: async (queryInterface, Sequelize) => {
    await queryInterface.createTable('Categories', {
      id: {
        allowNull: false,
        primaryKey: true,
        type: Sequelize.UUID
      },
      code: {
        type: Sequelize.STRING(64)
      },
      name: {
        type: Sequelize.STRING(256)
      },
      description: {
        type: Sequelize.TEXT
      },
      displayName: {
        type: Sequelize.STRING(256)
      },
      smallImage: {
        type: Sequelize.STRING(1024)
      },
      mediumImage: {
        type: Sequelize.STRING(1024)
      },
      largeImage: {
        type: Sequelize.STRING(1024)
      },
      isDeleted: {
        type: Sequelize.BOOLEAN,
        default: false
      },
      creatorUserId: {
        type: Sequelize.UUID,
        allowNull: true
      },
      updaterUserId: {
        type: Sequelize.UUID,
        allowNull: true
      },
      deleterUserId: {
        type: Sequelize.UUID,
        allowNull: true
      },
      creationTime: {
        type: Sequelize.DATE
      },
      updationTime: {
        type: Sequelize.DATE
      },
      deletionTime: {
        type: Sequelize.DATE
      }
    });
  },
  down: async (queryInterface, Sequelize) => {
    await queryInterface.dropTable('Categories');
  }
};