'use strict';

const { v4: uuidv4 } = require('uuid');

module.exports = {
  up: async (queryInterface, Sequelize) => {
    await queryInterface.createTable('VariantOptions', {
      id: { // product option id
        allowNull: false,
        primaryKey: true,
        type: Sequelize.UUID
      },
      variantId: {
        type: Sequelize.UUID,
        references: {
          model: 'ProductVariants',
          key: 'id',
          as: 'variantId'
        },
        onUpdate: 'restrict',
        onDelete: 'restrict'
      },
      productId: {
        type: Sequelize.UUID
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
      deletionTime: {
        type: Sequelize.DATE
      }
    });
  },
  down: async (queryInterface, Sequelize) => {
    await queryInterface.dropTable('VariantOptions');
  }
};