'use strict';

module.exports = {
  up: async (queryInterface, Sequelize) => {
    /**
     * Add altering commands here.
     *
     * Example:
     * await queryInterface.createTable('users', { id: Sequelize.INTEGER });
     */
     queryInterface.addConstraint('ProductVariants', {
       fields: ['productId', 'name'],
       type: 'unique',
       name: 'productId-name-productvariants-UKey'
     });
  },

  down: async (queryInterface, Sequelize) => {
    /**
     * Add reverting commands here.
     *
     * Example:
     * await queryInterface.dropTable('users');
     */
     queryInterface.removeConstraint('ProductVariants', 'productId-name-productvariants-UKey');
  }
};
