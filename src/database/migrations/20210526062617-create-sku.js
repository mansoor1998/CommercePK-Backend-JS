'use strict';

const { v4: uuidv4 } = require('uuid');

module.exports = {
  up: async (queryInterface, Sequelize) => {
    await queryInterface.createTable('SKUs', {
      id: {
        allowNull: false,
        primaryKey: true,
        type: Sequelize.UUID
      },
      productId: {
        type: Sequelize.UUID,
        references: {
          model: 'Products',
          key: 'id',
          as: 'productId'
        },
        onUpdate: 'restrict',
        onDelete: 'restrict'
      },
      skuNumber: {
        type: Sequelize.STRING(64)
      },
      skuName: {
        type: Sequelize.STRING(256)
      },
      skuMessage: {
        type: Sequelize.STRING(512)
      },
      trackInventory: {
        type: Sequelize.INTEGER
      },
      inventoryLevel: {
        type: Sequelize.INTEGER
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
    await queryInterface.dropTable('SKUs');
  }
};