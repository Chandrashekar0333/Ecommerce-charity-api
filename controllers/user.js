let users = require("../models/user");
const bycrpt = require("bcrypt");
const jwt=require("jsonwebtoken")
require("dotenv").config()
async function register(req, res) {
  try {
    const { name, email, password, mobileno, role } = req.body;
    let existing_user = await users.findOne({ email: email });
    if (existing_user) {
      return res.status(400).json({
        status: "failed",
        message: "User already exist",
      });
    } else {
      bycrpt.hash(password, 10, async function (err, hash) {
        if (err) {
          return res.status(400).json({
            status: "Failed",
            message: "Error in hashing",
          });
        }

        let user = {
          name,
          email,
          password: hash,
          mobileno,
          role,
        };

        let data = await users.insertOne(user);
        return res.status(201).json({
          status: "success",
          message: "User registration successfull",
          data: {
            user: data,
          },
        });
      });
    }
  } catch (err) {
    return res.status(500).json({
      status: "Failed",
      message: "Error in registration",
      error: err.message,
    });
  }
}

async function login(req, res) {
  try {
    const { email, password,mobileno} = req.body;

    let existing_user = await users.findOne({
      $or: [{ email: email }, { mobileno: mobileno }],
    });
    if (existing_user) {
      bycrpt.compare(
        password,
        existing_user.password,
        async function (err, result) {
          if (err) {
            return res.status(400).json({
              status: "Failed",
              message: "Error in decoding",
            });
          }
          if (result) {
            console.log(existing_user._id, existing_user.email);
            jwt.sign(
              { user_id: existing_user._id, email: existing_user.email },
              process.env.JWT_SECRET,
              function (err, token) {
                if(err){
                  return res.status(500).json({
                    message:"Error in creating the token"
                  })
                };
            return res.status(200).json({
              status: "success",
              message: "User login successfull",
              token:token
            });
          })
          } else {
            return res.status(400).json({
              status: "failed",
              message: "Invalid Credentials",
            });
          }
        }
      );
    }
  } catch (err) {
    return res.status(400).json({
      status: "failed",
      message: err.message,
    });
  }
}

module.exports = { register, login };
