'use strict';
const {
  Model
} = require('sequelize');
const { fullAuditEntity } = require('../utilities/auditmodel');
const FullAuditModel = require('../utilities/fullaudit.model');
const { v4: uuidv4 } = require('uuid');



 /**
    * @typedef {Object} Product
    * @property {string} title
    * @property {string} code 
    * @property {string} isActive
    * @property {string} keywords 
    * @property {string} shortDiscription 
    * @property {string} description
    * @property {number} unitCost  
    * @property {number} unitPrice 
    * @property {number} weight
    * @property {string} smallImage 
    * @property {string} mediumImage 
    * @property {string} largeImage 
    * @property {string} primaryCategoryId
    * @property {string} hasVariant
    * @property {string} status
    * 
    * @property {string} creatorUserId
    * @property {Date} creationTime
    * @property {string} updaterUserId
    * @property {Date} updationTime
    * @property {string} deleterUserId
    * @property {Date} deletionTime
    * @property {boolean} isDeleted
    * @property {Array<import('./sku').SKU>} SKUs
   */


/**
 * User model
 * @callback ProductFactory
 * @param {Sequelize} sequelize Description
 * @param {DataTypes} DataTypes Description
 * @returns {Product}
*/
module.exports = (sequelize, DataTypes) => {
  
  /**
   * @constructor {Product.<ProductObj>}
   */
  class Product extends FullAuditModel {
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
      Product.belongsToMany( models.Category, { through: models.ProductCategory, foreignKey: 'productId' } ); // many to many relationships
      // product has one primary category
      Product.belongsTo( models.Category, {  foreignKey: 'primaryCategoryId', as: 'primaryCategory' } ); // many to one relationship
      // one product has many skus
      Product.hasMany( models.SKU, { foreignKey: 'productId' } ); // one to many relationship
      // prodcut has/might have many variatns
      Product.hasMany( models.ProductVariant, { foreignKey: 'productId' } );
      // Product.belongsTo( models.VariantOption, { foreignKey: 'ProductId' } );
      Product.hasMany( models.SKUValue, { foreignKey: 'productId' } );
    }
  };

  Product.init({
    id: {
      allowNull: false,
      primaryKey: true,
      type: DataTypes.UUID,
      defaultValue: () => uuidv4()
    },
    title: DataTypes.STRING(256),
    code: DataTypes.STRING(64),
    isActive: DataTypes.BOOLEAN,
    keywords: DataTypes.STRING(256),
    shortDiscription: DataTypes.STRING(512),
    description: DataTypes.TEXT,
    unitCost: DataTypes.DECIMAL(10,4),
    unitPrice: DataTypes.DECIMAL(10,4),
    weight: DataTypes.DECIMAL(10,4),
    smallImage: DataTypes.STRING(1024),
    mediumImage: DataTypes.STRING(1024),
    largeImage: DataTypes.STRING(1024),
    primaryCategoryId: DataTypes.UUID,
    hasVariant: DataTypes.BOOLEAN,
    status: DataTypes.STRING,
    ...fullAuditEntity

  }, {
    sequelize,
    modelName: 'Product',
    timestamps: false,
    createdAt: false,
    updatedAt: false
  });

  
  return Product;
};