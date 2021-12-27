'use strict';
const {
  Model
} = require('sequelize');

const { fullAuditEntity } = require('../utilities/auditmodel');

const { v4: uuidv4 } = require('uuid');

module.exports = (sequelize, DataTypes) => {
  class ProductVariant extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    /**
     * @typedef {import('./index').database} model
     * @param {model} models 
     */
    static associate(models) {
      // define association here
      ProductVariant.hasMany( models.VariantOption, { foreignKey: 'variantId' } );
    }
  };
  ProductVariant.init({
    id: {
      allowNull: false,
      primaryKey: true,
      type: DataTypes.UUID,
      defaultValue: () => uuidv4()
    },
    productId: {
      type: DataTypes.UUID
    },
    name: DataTypes.STRING,
    description: DataTypes.STRING,
    ...fullAuditEntity
  }, {
    sequelize,
    modelName: 'ProductVariant',
    timestamps: false,
    createdAt: false,
    updatedAt: false,
  });
  return ProductVariant;
};