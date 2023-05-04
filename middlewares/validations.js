const {validationResult} = require("express-validator");

//Middleware for field validations
const validateFields = (req, res, next) => {
    const errors = validationResult(req)
    if (!errors.isEmpty()){
        return res.status(400).json(errors)
    }

    //Continue next middleware
    next()
}

module.exports = {
    validateFields,
}