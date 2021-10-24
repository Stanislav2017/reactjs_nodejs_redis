module.exports = class UserDto {
  id;
  email;
  isEmailConfirmed;
  role;

  constructor(model) {
    this.email = model.email;
    this.id = model._id;
    this.isEmailConfirmed = model.isEmailConfirmed;
    this.role = model.role;
  }
};
