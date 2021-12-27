'use strict';
module.exports = {
  up: async (queryInterface, Sequelize) => {
    await queryInterface.createTable('ProductCategories', {
      categoryId: {
        type: Sequelize.UUID,
        allowNull: false,
        references: {
          model: 'Categories',
          key: 'id',
          as: 'categoryId'
        },
        onUpdate: 'restrict',
        onDelete: 'restrict'
      },
      productId: {
        type: Sequelize.UUID,
        allowNull: false,
        references: {
          model: 'Products',
          key: 'id',
          as: 'productId'
        },
        onUpdate: 'restrict',
        onDelete: 'restrict'
      }
    });
  },
  down: async (queryInterface, Sequelize) => {
    await queryInterface.dropTable('ProductCategories');
  }
};