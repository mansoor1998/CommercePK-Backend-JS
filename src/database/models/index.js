'use strict';
require('dotenv').config()
const fs = require('fs');
const path = require('path');
const Sequelize = require('sequelize');
const basename = path.basename(__filename);
const env = process.env.NODE_ENV || 'development';
const config = require(__dirname + '/../config/config.json')[env];


/**
 * @type {Sequelize.Sequelize}
 */
let sequelize;
if (config.use_env_variable) {
  sequelize = new Sequelize.Sequelize(process.env[config.use_env_variable], config);
} else {
  sequelize = new Sequelize.Sequelize(config.database, config.username, config.password, config);
}



const User = require('./user')(sequelize, Sequelize.DataTypes);
const UserDetail = require('./userdetail')(sequelize, Sequelize.DataTypes);
const Role = require('./role')(sequelize, Sequelize.DataTypes);
const UserRole = require('./userrole')(sequelize, Sequelize.DataTypes);
const Product = require('./product')(sequelize, Sequelize.DataTypes);
const Category = require('./category')(sequelize, Sequelize.DataTypes);
const ProductCategory = require('./productcategory')(sequelize, Sequelize.DataTypes);
const ProductVariant = require('./productvariant')(sequelize, Sequelize.DataTypes);
const VariantOption = require('./variantoption')(sequelize, Sequelize.DataTypes);
const SKU = require('./sku')(sequelize, Sequelize.DataTypes);
const SKUValue = require('./skuvalue')(sequelize, Sequelize.DataTypes);
// type definition of variable db

/**
 * @typedef {Object} database
 * @property {User} User - user model.
 * @property {UserDetail} UserDetail - user detail model
 * @property {Role} Role - define role model
 * @property {UserRole} UserRole - define associate model b/w user and userrole
 * @property {Product} Product - different products in the system 
 * @property {Category} Category - product categories
 * @property {ProductCategory} ProductCategory - different types of ProductCategories
 * @property {ProductVariant} ProductVariant - 
 * @property {VariantOption} VariantOption
 * @property {SKU} SKU
 * @property {SKUValue} SKUValue
 * @property {sequelize} sequelize - sequelize object
 * @property {Sequelize} Sequelize - Sequelize Class Type
 */

/**
 * @type { database }
 */
 const db = {};

 
fs
  .readdirSync(__dirname)
  .filter(file => {
    return (file.indexOf('.') !== 0) && (file !== basename) && (file.slice(-3) === '.js');
  })
  .forEach(file => {
    // @ts-ignore
    const model = require(path.join(__dirname, file))(sequelize, Sequelize.DataTypes);
    db[model.name] = model;
  });


Object.keys(db).forEach(modelName => {
  if (db[modelName].associate) {
    db[modelName].associate(db);
  }
});

db.sequelize = sequelize;
db.Sequelize = Sequelize;


module.exports = db;