'use strict';
const {
  Model
} = require('sequelize');
const { fullAuditEntity } = require('../utilities/auditmodel');
const { v4: uuidv4 } = require('uuid');
const FullAuditModel = require('../utilities/fullaudit.model');


module.exports = (sequelize, DataTypes) => {
  class Category extends FullAuditModel {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
      Category.belongsToMany( models.Product, { through: models.ProductCategory, foreignKey: 'categoryId' } );
    }
  };
  Category.init({
    id: {
      allowNull: false,
      primaryKey: true,
      type: DataTypes.UUID,
      defaultValue: () => uuidv4()
    },
    code: DataTypes.STRING,
    name: DataTypes.STRING,
    description: DataTypes.TEXT,
    displayName: DataTypes.STRING,
    smallImage: DataTypes.STRING,
    mediumImage: DataTypes.STRING,
    largeImage: DataTypes.STRING,
    ...fullAuditEntity
  }, {
    sequelize,
    modelName: 'Category',
    timestamps: false,
    createdAt: false,
    updatedAt: false,
  });
  return Category;
};