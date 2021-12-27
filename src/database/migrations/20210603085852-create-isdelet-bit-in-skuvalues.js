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
      queryInterface.addColumn('SKUValues', 'isDeleted', { 
        type: Sequelize.BOOLEAN,
        defaultValue: false
      }),
      queryInterface.addColumn('SKUValues', 'deletionTime', { 
        type: Sequelize.DATE
      }),
      queryInterface.addColumn('SKUValues', 'deleterUserId', { 
        type: Sequelize.UUID
      }),
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
      queryInterface.removeColumn('SKUValues', 'isDeleted'),
      queryInterface.removeColumn('SKUValues', 'deletionTime'),
      queryInterface.removeColumn('SKUValues', 'deleterUserId'),
    ]);
  }
};
