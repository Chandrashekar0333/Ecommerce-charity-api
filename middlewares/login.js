const { body, validationResult } = require("express-validator");

const validateloginSchema = [
  body("email")
    .if(body("mobileno").not().exists())
    .notEmpty()
    .withMessage("email is required")
    .isEmail()
    .withMessage("invalid email"),
  body("mobileno")
    .if(body("email").not().exists())
    .notEmpty()
    .withMessage("mobile number is required ")
    .isMobilePhone()
    .withMessage("enter a valid mobile number"),
  body("password")
    .notEmpty()
    .withMessage("password is required")
    .isAlphanumeric()
    .withMessage("password should contain only alphabets or numbers")
    .isLength({ max: 12 })
    .withMessage("Password should not exceed 12 characters")
    .isLength({ min: 6 })
    .withMessage("Password should contain at least 6 chars"),
];

function validateuserloginSchema(req, res, next) {
  let results = validationResult(req);
  if (!results.isEmpty()) {
    let errors = results.array();
    return res.status(400).json({
      status: "Failed",
      message: errors[0].msg
    });
  } else {
    next();
  }
}

module.exports = { validateloginSchema, validateuserloginSchema }