module.exports = class UserDto {
  email;
  id;
  isActivated;
  role;
  address;
  first_name;
  last_name;

  constructor(model) {
    this.email = model.email;
    this.id = model.id;
    this.isActivated = model.isActivated;
    this.role = model.role;
    this.address = model.address;
    this.first_name = model.first_name;
    this.last_name = model.last_name;
  }
};
