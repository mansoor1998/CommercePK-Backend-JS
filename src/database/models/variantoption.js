'use strict';
const {
  Model
} = require('sequelize');


const { v4: uuidv4 } = require('uuid');

module.exports = (sequelize, DataTypes) => {
  class VariantOption extends Model {
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
      // VariantOption.hasMany( models.SKUValue, { foreignKey: 'variantId' } );
      VariantOption.belongsTo( models.ProductVariant, { foreignKey: 'variantId' } );
    }
  };
  VariantOption.init({
    id: {
      type: DataTypes.UUID,
      primaryKey: true,
      defaultValue: () => uuidv4(),
      allowNull: false,
    },
    variantId: DataTypes.UUID,
    productId: DataTypes.UUID,
    name: DataTypes.STRING,
    description: DataTypes.STRING
  }, {
    sequelize,
    modelName: 'VariantOption',
    timestamps: false,
    createdAt: false,
    updatedAt: false,
  });
  return VariantOption;
};