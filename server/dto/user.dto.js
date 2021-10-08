module.exports = class UserDto {
  id;
  email;
  isEmailConfirmed;

  constructor(model) {
    this.email = model.email;
    this.id = model._id;
    this.isEmailConfirmed = model.isEmailConfirmed;
  }
};
