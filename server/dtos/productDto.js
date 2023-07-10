module.exports = class ProductDto {
  id;
  name;
  images;
  price;
  categories;
  sizes;

  constructor(model) {
    this.id = model.id;
    this.name = model.name;
    this.images = model.images;
    this.price = model.price;
    this.categories = model.categories;
    this.sizes = model.sizes;
  }
};
