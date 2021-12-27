'use strict';
const { v4: uuidv4 } = require('uuid');
const FullAuditModel = require('../utilities/fullaudit.model');

  /**
  * @typedef {Object} UserObj
  * @property {string} id - user model.
  * @property {string} username
  * @property {string} email
  * @property {string} password
  * @property {boolean} isActive
  * @property {string} status
  * @property {string} firstName
  * @property {string} lastName
  * @property {Date} creationTime
  * @property {Date} updationTime
  * @property {string} creatorUserId
  * @property {string} updaterUserId
  */

/**
 * User model
 * @callback UserFactory
 * @param {Sequelize} sequelize Description
 * @param {DataTypes} DataTypes Description
 * @returns {User}
*/
module.exports = (sequelize, DataTypes) => {


  class User extends FullAuditModel {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
      User.hasMany(models.UserDetail, { foreignKey: 'userId' });
      User.belongsToMany(models.Role, { through: models.UserRole, foreignKey: 'userId' });
    }
  };
  User.init({

    id: {
      allowNull: false,
      primaryKey: true,
      type: DataTypes.UUID,
      defaultValue: () => uuidv4()
    },
    username: {
      type: DataTypes.STRING,
      unique: true,
      allowNull: false
    },
    email: {
      type: DataTypes.STRING,
      unique: true,
      allowNull: false
    },
    password: DataTypes.STRING,
    isActive: DataTypes.BOOLEAN,
    status: DataTypes.STRING,
    firstName: DataTypes.STRING,
    lastName: DataTypes.STRING,
    creationTime: DataTypes.DATE,
    updationTime: DataTypes.DATE,
    creatorUserId: DataTypes.UUID,
    updaterUserId: DataTypes.UUID
  }, {
    sequelize,
    modelName: 'User',
    timestamps: false,
    createdAt: false,
    updatedAt: false,
  });

  // let user = new User();

  return User;
};