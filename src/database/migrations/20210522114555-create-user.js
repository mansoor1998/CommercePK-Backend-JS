'use strict';

const { v4: uuidv4 } = require('uuid');

module.exports = {
  up: async (queryInterface, Sequelize) => {
    await queryInterface.createTable('Users', {
      id: {
        allowNull: false,
        primaryKey: true,
        type: Sequelize.UUID
      },
      username: {
        type: Sequelize.STRING(128),
        unique: true
      },
      email: {
        type: Sequelize.STRING(256),
        is: /^([a-zA-Z0-9_\-\.]+)@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.)|(([a-zA-Z0-9\-]+\.)+))([a-zA-Z]{2,6}|[0-9]{1,3})(\]?)$/,
        allowNull: true,
        unique: true
      },
      password: {
        type: Sequelize.STRING(128)
      },
      isActive: {
        type: Sequelize.BOOLEAN,
        default: false,
      },
      status: {
        type: Sequelize.STRING(64)
      },
      firstName: {
        type: Sequelize.STRING(254)
      },
      lastName: {
        type: Sequelize.STRING(254)
      },
      creationTime: {
        type: Sequelize.DATE
      },
      updationTime: {
        type: Sequelize.DATE
      },
      creatorUserId: {
        type: Sequelize.UUID,
        allowNull: true
      },
      updaterUserId: {
        type: Sequelize.UUID,
        allowNull: true
      }
    });
  },
  down: async (queryInterface, Sequelize) => {
    await queryInterface.dropTable('Users');
  }
};