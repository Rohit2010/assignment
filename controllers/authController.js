require("dotenv").config();
const User = require("../models/user");
const {validationResult } = require("express-validator");
var jwt = require("jsonwebtoken");
const bcrypt = require('bcryptjs');

exports.signup = (req, res) => {
  const errors = validationResult(req);

  if (!errors.isEmpty()) {
    return res.status(422).json({
      error: errors.array()[0].msg
    });
  }

  const {email,firstName,lastName,password} = req.body;

    console.log(req.body)

    if (!firstName || !email || !lastName || !password) {
        res.status(422).json({error:"Please add all the fields"})
    }

    User.findOne({email:email})
    .then((saveduser) => {
        if (saveduser) {
            res.status(422).json({error:"User already exists"})
        }
    })

    //password hashing
    bcrypt.hash(password,12)
    .then((hashpassword) => {
        const user = new User({
            firstName,
            lastName,
            email,
            password:hashpassword,
        })
        user.save()
        .then(user =>{
            return res.status(200).json({
                user:{
                    email:user.email,
                    _id:user._id
                }
            })
        })
        .catch(err => console.log(err))
    })
};

exports.signin = (req, res) => {
  const errors = validationResult(req);
  const { email, password } = req.body;

  if (!errors.isEmpty()) {
    return res.status(422).json({
      error: errors.array()[0].msg
    });
  }
  if(!email || !password){
     return res.status(422).json({error:"please add email or password"})
  }
  User.findOne({email:email})
  .then(saveduser=>{
      if(!saveduser){
         return res.status(422).json({error:"Invalid Email or password"})
      }

      //comparing hashed password from the database
      bcrypt.compare(password,saveduser.password)
      .then(doMatch=>{
          if(doMatch){
              // res.json({message:"successfully signed in"})
             const token = jwt.sign({_id:saveduser._id},process.env.JWT_SECRET)
             const {_id,email} = saveduser
             res.json({token,user:{_id,email,}})
          }
          else{
              return res.status(422).json({error:"Invalid Email or password"})
          }
      })
      .catch(err=>{
          console.log(err)
      })
  })
};

exports.signout = (req, res) => {
  res.clearCookie("token");
  res.json({
    message: "User signout successfully"
  });
};
