'use strict';
const {
  Model
} = require('sequelize');
const { fullAuditEntity } = require('../utilities/auditmodel');
const { v4: uuidv4 } = require('uuid');
const FullAuditModel = require('../utilities/fullaudit.model');


 /**
    * @typedef {Object} SKU 
    * @property {string} id
    * @property {string} productId: DataTypes.UUID,
    * @property {string} skuNumber: DataTypes.STRING,
    * @property {string} skuName: DataTypes.STRING,
    * @property {string} skuMessage: DataTypes.STRING,
    * @property {number} trackInventory: DataTypes.INTEGER,
    * @property {number} inventoryLevel: DataTypes.INTEGER,
    * @property {string} smallImage: DataTypes.STRING,
    * @property {string} mediumImage: DataTypes.STRING,
    * @property {string} largeImage: DataTypes.STRING,
    * @property { import('./skuvalue').SKUValue } SKUValue
   */


/**
 * User model
 * @callback ProductFactory
 * @param {Sequelize} sequelize Description
 * @param {DataTypes} DataTypes Description
 * @returns {Product}
*/
module.exports = (sequelize, DataTypes) => {
  class SKU extends FullAuditModel {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
      SKU.belongsTo( models.Product, { foreignKey: 'productId' } );
      SKU.hasMany( models.SKUValue, { foreignKey: 'SKUId' } );
    }
  };
  SKU.init({
    id: {
      type: DataTypes.UUID,
      primaryKey: true,
      defaultValue: () => uuidv4(),
      allowNull: false
    },
    productId: DataTypes.UUID,
    skuNumber: DataTypes.STRING,
    skuName: DataTypes.STRING,
    skuMessage: DataTypes.STRING,
    trackInventory: DataTypes.INTEGER,
    inventoryLevel: DataTypes.INTEGER,
    smallImage: DataTypes.STRING,
    mediumImage: DataTypes.STRING,
    largeImage: DataTypes.STRING,
    ...fullAuditEntity
  }, {
    sequelize,
    modelName: 'SKU',
    timestamps: false,
    createdAt: false,
    updatedAt: false,
  });
  return SKU;
};