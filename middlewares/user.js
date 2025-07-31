const { body, validationResult } = require("express-validator");

const validateSchema = [
  body("name")
    .notEmpty()
    .withMessage("username is required")
    .isAlpha()
    .withMessage("username should contain only alphabets"),

  body("email")
    .notEmpty()
    .withMessage("email is required")
    .isEmail()
    .withMessage("invalid email"),
  body("mobileno")
    .notEmpty()
    .withMessage("mobileNumber is required")
    .isLength({ min: 10 })
    .withMessage("mobileNumber should contain 10 digits")
    .isInt()
    .withMessage("mobileNumber should contain only integers"),
  body("password")
    .notEmpty()
    .withMessage("password is required")
    .isAlphanumeric()
    .withMessage("password should contain only alphabets or numbers")
    .isLength({ max: 12 })
    .withMessage("Password should not exceed 12 characters")
    .isLength({ min: 6 })
    .withMessage("Password should contain atleast 6 chars"),
];
function validateUserSchema(req,res,next){
    let results = validationResult(req);
    if(!results.isEmpty()){
        let errors = results.array();
        return res.status(400).json({
            status:"Failed",
            message:errors[0].msg
        })
    }else{
        next()
    }
};

module.exports = {validateSchema,validateUserSchema}