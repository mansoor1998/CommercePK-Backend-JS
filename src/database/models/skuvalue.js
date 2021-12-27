'use strict';
const {
  Model
} = require('sequelize');
const FullAuditModel = require('../utilities/fullaudit.model');


 /**
    * @typedef {Object} SKUValue
    * @property {string} productId
    * @property {string} variantId
    * @property {string} optionId
    * @property {string} SKUId 
   */


/**
 * User model
 * @callback ProductFactory
 * @param {Sequelize} sequelize Description
 * @param {DataTypes} DataTypes Description
 * @returns {Product}
*/
module.exports = (sequelize, DataTypes) => {
  class SKUValue extends FullAuditModel {
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
      // a single row has only one variant option combination
      SKUValue.belongsTo( models.VariantOption, { foreignKey: 'optionId', targetKey: 'id' } );
      // a single row has only one product variant combination
      SKUValue.belongsTo( models.ProductVariant, { foreignKey: 'variantId', targetKey: 'id'} );
      // a single row has only one sku combination
      // SKUValue.belongsTo( models.SKU, { foreignKey: 'SKUId', targetKey: 'id' } );
    }
  };
  SKUValue.init({
    productId: {
      type: DataTypes.UUID,
      primaryKey: true
    },
    optionId: DataTypes.UUID,
    SKUId: {
      type: DataTypes.UUID,
      primaryKey: true
    },
    variantId: {
      type: DataTypes.UUID,
      primaryKey: true
    }
  }, {
    sequelize,
    modelName: 'SKUValue',
    timestamps: false,
    createdAt: false,
    updatedAt: false,
  });
  return SKUValue;
};