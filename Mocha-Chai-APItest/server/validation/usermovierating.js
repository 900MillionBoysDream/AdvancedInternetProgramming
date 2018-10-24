const Validator = require('validator');
const isEmpty = require('./isempty');

// validate user's rating of a movie
module.exports = function validateUserMovieRatingInput(data) {
    let errors = {};
    data.rating = !isEmpty(data.rating) ? String(data.rating) : '';

    if (Validator.isDecimal(data.rating) && (parseFloat(data.rating) > 10 || parseFloat(data.rating) <= 0))
        errors.rating = 'Rating must be between 0 and 10';

    if (!Validator.isDecimal(data.rating))
        errors.rating = 'Rating must be a decimal number';

    if (Validator.isEmpty(data.rating))
        errors.rating = 'Please rate this movie before submitting';

    if (Validator.isEmpty(data.movieID))
        errors.movie = 'Movie ID is required';

    return {
        errors,
        isValid: isEmpty(errors)
    };
};
