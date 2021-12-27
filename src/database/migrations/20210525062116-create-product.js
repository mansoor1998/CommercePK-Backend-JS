'use strict';

const { v4: uuidv4 } = require('uuid');

module.exports = {
  up: async (queryInterface, Sequelize) => {
    await queryInterface.createTable('Products', {
      id: {
        allowNull: false,
        primaryKey: true,
        type: Sequelize.UUID
      },
      code: {
        type: Sequelize.STRING(64)
      },
      isActive: {
        type: Sequelize.BOOLEAN
      },
      keywords: {
        type: Sequelize.STRING(256)
      },
      shortDiscription: {
        type: Sequelize.STRING(512)
      },
      description: {
        type: Sequelize.TEXT
      },
      unitCost: {
        type: Sequelize.DECIMAL(10, 4)
      },
      unitPrice: {
        type: Sequelize.DECIMAL(10, 4)
      },
      weight: {
        type: Sequelize.DECIMAL(10, 4)
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
      primaryCategoryId: {
        type: Sequelize.UUID
      },
      hasVariant: {
        type: Sequelize.BOOLEAN
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
    await queryInterface.dropTable('Products');
  }
};