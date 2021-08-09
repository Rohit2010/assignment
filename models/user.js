var mongoose = require("mongoose");

//user model
var userSchema = new mongoose.Schema({
   firstName: {
       type: String,
       required: true,
       maxlength: 15,
       trim: true
   },
   lastName: {
       type: String,
       required: true,
       maxlength: 15,
       trim: true
   },
   email: {
       type: String,
       trim: true,
       index:true,
       unique:true,
       required:true
   },
   password: {
       type: String,
       trim: true,
       required:true
   },
  
  },
        { timestamps: true }
  ); 


  module.exports = mongoose.model("User" , userSchema)