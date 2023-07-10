'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class Rating extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      Rating.belongsTo(models.Product, {foreignKey:"product_id"})
      Rating.belongsTo(models.User, {foreignKey:"user_id"})
    }
  }
  Rating.init({
    rating: DataTypes.INTEGER,
    review: DataTypes.STRING,
    product_id:DataTypes.INTEGER,
    user_id:DataTypes.INTEGER
  }, {
    sequelize,
    modelName: 'Rating',
  });
  return Rating;
};