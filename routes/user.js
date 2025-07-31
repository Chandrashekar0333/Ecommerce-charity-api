const express=require("express")
const { validateSchema, validateUserSchema } = require("../middlewares/user")
const { register, login } = require("../controllers/user")
const { validateloginSchema, validateuserloginSchema } = require("../middlewares/login")
let router=express.Router()

router.post("/register",validateSchema,validateUserSchema,register)
router.post("/login",validateloginSchema,validateuserloginSchema,login)

module.exports=router;