const { body, validationResult } = require('express-validator')
const userValidationRules = () => {
    return [
        body('email','Invalid email').isEmail().normalizeEmail(),
        body('password', 'Password must contain at least one number, one lowercase and one uppercase letter and one special character ').isLength({
                min:8
            }).matches(/^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&_])[A-Za-z\d@$!%*?&_]{8,}$/),
    ]
}

const validate = (req, res, next) => {
    const errors = validationResult(req)
    if (errors.isEmpty()) {
        return next()
    }
    return res.status(422).json({
        errors
    })
}

module.exports = {
    userValidationRules,
    validate,
}
