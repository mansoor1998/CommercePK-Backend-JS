'use strict';

const { v4: uuidv4 } = require('uuid');

module.exports = {
  up: async (queryInterface, Sequelize) => {
    await queryInterface.createTable('ProductVariants', {
      id: { // productVariant Id
        allowNull: false,
        primaryKey: true,
        type: Sequelize.UUID,
      },
      productId: {
        type: Sequelize.UUID,
        allowNull:false,
        references: {
          model: 'Products',
          key: 'id',
          as: 'productId'
        },
        onUpdate: 'RESTRICT',
        onDelete: 'RESTRICT'
      },
      name: {
        type: Sequelize.STRING(128)
      },
      description: {
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
    await queryInterface.dropTable('ProductVariants');
  }
};