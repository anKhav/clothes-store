'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class Product extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      Product.belongsToMany(models.Size, {foreignKey:'ProductId', through: models.ProductSize})
      Product.belongsToMany(models.Category, {foreignKey:'ProductId', through: models.ProductCategory})
      Product.belongsToMany(models.Order, {foreignKey:'product_id', through: models.ProductOrder})
      Product.hasMany(models.Rating, {foreignKey:'product_id'})
    }
  }
  Product.init({
    name: DataTypes.STRING,
    price: DataTypes.STRING,
    imgs: DataTypes.STRING,
  }, {
    sequelize,
    modelName: 'Product',
  });
  return Product;
};