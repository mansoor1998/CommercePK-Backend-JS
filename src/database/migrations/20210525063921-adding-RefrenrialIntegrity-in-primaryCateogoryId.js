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
      queryInterface.addConstraint('Products', {
        fields: ['primaryCategoryId'],
        type: 'foreign key',
        name: 'Products-Categories-primaryCategoryId-fkey',
        references: {
          table: 'Categories',
          field: 'id'
        },
         onUpdate: 'RESTRICT', // restrict is the default behaviour of the database upon creation of refrential integrity
         onDelete: 'RESTRICT'
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
      queryInterface.removeConstraint('Products', 'Products-Categories-primaryCategoryId-fkey')
    ]);
  }
};
