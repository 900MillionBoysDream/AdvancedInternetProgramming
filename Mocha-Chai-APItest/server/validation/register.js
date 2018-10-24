const Validator = require("validator");
const isEmpty = require("./isempty");

// validate user input on register page
module.exports = function validateRegisterInput(data) {
  let errors = {};

  data.name = !isEmpty(data.name) ? data.name : "";
  data.email = !isEmpty(data.email) ? data.email : "";
  data.password = !isEmpty(data.password) ? data.password : "";
  data.password2 = !isEmpty(data.password2) ? data.password2 : "";

  if (!Validator.isLength(data.name, { min: 3, max: 15 }))
    errors.name = "Name must be between 3 and 15 characters";

  if (Validator.isEmpty(data.name))
    errors.name = "Name is required";

  if (Validator.isEmpty(data.email))
    errors.email = "Email is required";

  if (!Validator.isEmail(data.email))
    errors.email = "Email is invalid";

  if (
    Validator.isAlpha(data.password) ||
    Validator.isNumeric(data.password) ||
    !Validator.isAlphanumeric(data.password)
  ) {
    errors.password = "Password must contain number and character";
  }

  if (!Validator.isLength(data.password, { min: 6, max: 30 }))
    errors.password = "Password must be at least 6 characters";

  if (Validator.isEmpty(data.password))
    errors.password = "Password is required";

  if (Validator.isEmpty(data.password2))
    errors.password2 = "Confirm Password is required";

  if (!Validator.equals(data.password, data.password2))
    errors.password2 = "Passwords do not match";

  return {
    errors,
    isValid: isEmpty(errors)
  };
};
