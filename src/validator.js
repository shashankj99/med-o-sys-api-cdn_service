const {check, validationResult} = require('express-validator');

/**
 * Property that consists of validation rules
 * @type {ValidationChain[]}
 */
exports.validateUploadImage = [
    check('img_string')
        .notEmpty().withMessage('Image string should not be empty')
        .isString().withMessage('Image string should be a string'),

    check('mobile_number')
        .notEmpty().withMessage('Mobile number must not be empty')
        .isNumeric().withMessage('Mobile number must be a number')
];

/**
 * function to check validation error if any and return them
 * @param req
 * @param res
 * @param next
 * @returns {any}
 */
exports.isRequestValidated = (req, res, next) => {
    // get all the errors
    const errors = validationResult(req);

    const extractedErrors = [];

    // loop through each error and get the error message
    errors.array().map(
        error => extractedErrors.push({[error.param]: error.msg})
    );

    // return the error if exists
    if (errors.array().length > 0)
        return res.status(422)
            .json({errors: extractedErrors});

    next();
};
