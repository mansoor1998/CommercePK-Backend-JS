'use strict';
const { v4: uuidv4 } = require('uuid');
module.exports = {
  up: async (queryInterface, Sequelize) => {
    await queryInterface.createTable('UserRoles', {
      userId: {
        type: Sequelize.UUID,
        allowNull: false,
        onDelete: 'CASCADE',
        references: {
          model: 'Users',
          key: 'id',
          as: 'userId'
        }
      },
      roleId: {
        type: Sequelize.UUID,
        allowNull: false,
        onDelete: 'CASCADE',
        references: {
          model: 'Roles',
          key : 'id',
          as: 'roleId'
        }
      }
    }).then(() => queryInterface.addConstraint('UserRoles', {
      fields: ['userId', 'roleId'],
      type: 'primary key',
      name: 'UserRole_pkey'
    }))
    ;
  },
  down: async (queryInterface, Sequelize) => {
    await queryInterface.dropTable('UserRoles');
  }
};