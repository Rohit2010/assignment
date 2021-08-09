var express = require("express");
var router = express.Router();
const { check } = require('express-validator');

const {signout, signup , signin, } = require("../controllers/authController")

//crate user
router.post("/signup", [
    check('firstName', 'First name should be min 3 character').isLength({min:3}),
    check('lastName', 'Last name should be min 3 character').isLength({min:3}),
    check('email', "email is invalid").isEmail(),
     // password must be at least 5 chars long
    check('password', "password should be a minimum 5 length").isLength({ min: 5 }),

],signup);

//login api
router.post("/signin", [
  check('email', "email is invalid").isEmail(),
// password must be at least 5 chars long
check('password', "password is invalid").isLength({ min: 5 }),

],signin);

//signout
router.get("/signout", signout)

module.exports= router;