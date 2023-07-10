'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class Size extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      Size.belongsToMany(models.Product, {foreignKey:'SizeId', through: 'ProductSize'})
    }
  }
  Size.init({
    size:{
      type:DataTypes.STRING,
      unique:true
    }
  }, {
    sequelize,
    modelName: 'Size',
  });
  return Size;
};