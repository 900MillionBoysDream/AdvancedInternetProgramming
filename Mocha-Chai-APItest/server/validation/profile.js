const Validator = require("validator");
const isEmpty = require("./isempty");

// validate user input on profile page
module.exports = function validateProfileInput(data) {
  let errors = {};

  data.handle = !isEmpty(data.handle) ? data.handle : "";
  data.status = !isEmpty(data.status) ? data.status : "";
  data.location = !isEmpty(data.location) ? data.location : "";
  data.bio = !isEmpty(data.bio) ? data.bio : "";

  if (!Validator.isLength(data.handle, { min: 2, max: 40 }))
    errors.handle = "Handle needs to between 2 and 4 characters";

  if (Validator.isEmpty(data.handle))
    errors.handle = "Profile handle is required";

  if (Validator.isEmpty(data.status) || parseInt(data.status, 10) === 0)
    errors.status = "Status field is required";

  if (Validator.isEmpty(data.location))
    errors.location = "Location field is required";

  if (Validator.isEmpty(data.bio)) errors.bio = "Bio field is required";

  return {
    errors,
    isValid: isEmpty(errors)
  };
};
