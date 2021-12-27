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
      queryInterface.changeColumn('Products', 'isActive',  { type: Sequelize.BOOLEAN, defaultValue: true }),
      queryInterface.addColumn('Products', 'status',  { 
        type: Sequelize.STRING(64)
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
      queryInterface.changeColumn('Products', 'isActive',  { type: Sequelize.BOOLEAN, defaultValue: null }),
      queryInterface.removeColumn('Products', 'status')
    ]);
  }
};
