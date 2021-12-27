'use strict';

module.exports = {
  up: async (queryInterface, Sequelize) => {
    /**
     * Add altering commands here.
     *
     * Example:
     * await queryInterface.createTable('users', { id: Sequelize.INTEGER });
     */
    return Promise.all([
      queryInterface.addColumn('SKUs', 'unitPrice', {
        type: Sequelize.DECIMAL(10,4)
      }),
      queryInterface.addColumn('SKUs', 'unitCost', {
        type: Sequelize.DECIMAL(10,4)
      })
    ]);
  },

  down: async (queryInterface, Sequelize) => {
    /**
     * Add reverting commands here.
     *
     * Example:
     * await queryInterface.dropTable('users');
     */
     return Promise.all([
      queryInterface.removeColumn('SKUs', 'unitPrice'),
      queryInterface.removeColumn('SKUs', 'unitCost')
    ]);
  }
};
