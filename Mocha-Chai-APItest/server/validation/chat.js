const Validator = require("validator");
const isEmpty = require("./isempty");

// set constraints for chatting content
module.exports = function validateChatInput(data) {
    let errors = {};
    data.text = !isEmpty(data.text) ? data.text : "";

    if (!Validator.isLength(data.text, { min: 1, max: 300 }))
        errors.text = "Chat must be no more than 300 characters";

    if (Validator.isEmpty(data.text))
        errors.text = "Text field is required";

    return {
        errors,
        isValid: isEmpty(errors)
    };
};
