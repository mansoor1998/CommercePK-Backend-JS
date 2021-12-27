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
      queryInterface.changeColumn('Users', 'username', {
        type: Sequelize.STRING(128),
        allowNull: false
      }),
      queryInterface.changeColumn('Users', 'email', {
        type: Sequelize.STRING(256),
        allowNull: false
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
      queryInterface.changeColumn('Users', 'username', {
        type: Sequelize.STRING(128),
        allowNull: true
      }),
      queryInterface.changeColumn('Users', 'email', {
        type: Sequelize.STRING(256),
        allowNull: true
      })
    ]);
  }
};
