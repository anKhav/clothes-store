module.exports = class ProductDto {
  id;
  name;
  description;
  image;
  price;
  categories;
  sizes;

  constructor(model) {
    this.id = model.id;
    this.name = model.name;
    this.description = model.description;
    this.image = model.image;
    this.price = model.price;
    this.categories = model.categories;
    this.sizes = model.sizes;
  }
};
