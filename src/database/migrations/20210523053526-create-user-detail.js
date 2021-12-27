'use strict';

const { v4: uuidv4 } = require('uuid');

module.exports = {
  up: async (queryInterface, Sequelize) => {
    await queryInterface.createTable('UserDetails', {
      id: {
        allowNull: false,
        primaryKey: true,
        type: Sequelize.UUID
      },
      status: {
        type: Sequelize.STRING(64),
        default: ''
      },
      address: {
        type: Sequelize.STRING(254)
      },
      city: {
        type: Sequelize.STRING(128)
      },
      postalCode: {
        type: Sequelize.STRING(64)
      },
      country: {
        type: Sequelize.STRING(64)
      },
      mobile: {
        type: Sequelize.STRING(64),
        unique: true,
      },
      userId: {
        type: Sequelize.UUID,
        allowNull: true,
        references: {
          model: 'Users',
          key: 'id',
          as: 'userId'
        },
        onUpdate: 'restrict',
        onDelete: 'restrict'
      },
      isDeleted: {
        type: Sequelize.BOOLEAN,
        default: false
      },
      creationTime: {
        type: Sequelize.DATE
      },
      updationTime: {
        type: Sequelize.DATE
      },
      deletionTime: {
        type: Sequelize.DATE
      },
      creatorUserId: {
        type: Sequelize.UUID,
        allowNull: true
      },
      updaterUserId: {
        type: Sequelize.UUID,
      },
      deleterUserId: {
        type: Sequelize.UUID
      }
    });
  },
  down: async (queryInterface, Sequelize) => {
    await queryInterface.dropTable('UserDetails');
  }
};