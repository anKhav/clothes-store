module.exports = class UserDto {
  email;
  id;
  isActivated;
  role;
  address;
  firstName;
  lastName;

  constructor(model) {
    this.email = model.email;
    this.id = model.id;
    this.isActivated = model.isActivated;
    this.role = model.role;
    this.address = model.address;
    this.firstName = model.firstName;
    this.lastName = model.lastName;
  }
};
