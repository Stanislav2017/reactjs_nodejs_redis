const Joi = require("joi");
const ApiError = require("../errors/api.error");

const signinUser = (req, res, next) => {
  const data = req.body;
  const schema = Joi.object().keys({
    email: Joi.string().email().required(),
    password: Joi.string().min(3).max(18),
  });
  const validationResult = schema.validate(data);
  if (validationResult.error) {
    const errors = validationResult.error.details.map((v) => ({
      message: v.message,
      path: v.path[0],
    }));
    return next(ApiError.BadRequest("Validation error!", errors));
  }
  return next();
};

const signupUser = (req, res, next) => {
  const data = req.body;
  const schema = Joi.object().keys({
    email: Joi.string().email().required(),
    password: Joi.string().min(3).max(18),
    confirmPassword: Joi.any()
      .equal(Joi.ref("password"))
      .required()
      .label("Confirm password")
      .messages({ "any.only": "{{#label}} does not match" }),
  });
  const validationResult = schema.validate(data);
  if (validationResult.error) {
    const errors = validationResult.error.details.map((v) => ({
      message: v.message,
      path: v.path[0],
    }));
    return next(ApiError.BadRequest("Validation error!", errors));
  }
  return next();
};

module.exports = { signinUser, signupUser };
