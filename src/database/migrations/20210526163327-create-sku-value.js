'use strict';
module.exports = {
  up: async (queryInterface, Sequelize) => {
    await queryInterface.createTable('SKUValues', {
      productId: {
        type: Sequelize.UUID,
        allowNull: false,
        primaryKey: true
      },
      variantId: {
        type: Sequelize.UUID,
        primaryKey: true,
        references: {
          model: 'ProductVariants',
          key: 'id',
          as: 'variantId'
        },
        onUpdate: 'restrict',
        onDelete: 'restrict'
      },
      SKUId: {
        type: Sequelize.UUID,
        primaryKey: true,
        references: {
          model: 'SKUs',
          key: 'id',
          as: 'SKUId'
        },
        onUpdate: 'restrict',
        onDelete: 'restrict'
      },
      optionId: {
        type: Sequelize.UUID,
        references: {
          model: 'VariantOptions',
          key: 'id',
          as: 'optionId'
        },
        onUpdate: 'restrict',
        onDelete: 'restrict'
      }
    });
  },
  down: async (queryInterface, Sequelize) => {
    await queryInterface.dropTable('SKUValues');
  }
};