'use strict';
const {
  Model
} = require('sequelize');

const { v4: uuidv4 } = require('uuid');


module.exports = (sequelize, DataTypes) => {
  class UserDetail extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
      // UserDetail.belongsTo(models.User, {
      //   foreignKey: 'userId',
      // });
    }
  };
  UserDetail.init({
    id: {
      allowNull: false,
      primaryKey: true,
      type: DataTypes.UUID,
      defaultValue: () => uuidv4()
    },
    status: DataTypes.STRING,
    address: DataTypes.STRING,
    city: DataTypes.STRING,
    postalCode: DataTypes.STRING,
    country: DataTypes.STRING,
    mobile: DataTypes.STRING,
    userId: {
      type:DataTypes.UUID,
      allowNull: true,
      references: {
        model: 'Users',
        key: 'id'
      },
      onUpdate: 'RESTRICT',
      onDelete: 'RESTRICT'
    },
    isDeleted: DataTypes.BOOLEAN,
    creationTime: DataTypes.DATE,
    updationTime: DataTypes.DATE,
    deletionTime: DataTypes.DATE,
    creatorUserId: DataTypes.UUID,
    updaterUserId: DataTypes.UUID,
    deleterUserId: DataTypes.UUID,
  }, {
    sequelize,
    modelName: 'UserDetail',
    timestamps: false,
    createdAt: false,
    updatedAt: false
  });

  return UserDetail;
};