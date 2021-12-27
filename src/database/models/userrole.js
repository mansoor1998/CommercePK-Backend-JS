'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class UserRole extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
      UserRole.belongsTo(models.User, {
        foreignKey: 'userId'
      });
    }
  };
  UserRole.init({
    userId: DataTypes.UUID,
    // {
    //   type: DataTypes.UUID,
    //   references: {
    //     model: 'Users',
    //     key: 'id'
    //   },
    //   onUpdate: 'RESTRICT',
    //   onDelete: 'RESTRICT'
    // },
    roleId: DataTypes.UUID
  }, {
    sequelize,
    modelName: 'UserRole',
    timestamps: false,
    createdAt: false,
    updatedAt: false
  });
  return UserRole;
};