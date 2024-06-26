const mongoose = require("mongoose");
 
// create an schema
const userSchema =mongoose.Schema({
    email:String,
    username:String,
    password:String,
    school_name:String,
    std_class:Number
           
        }, {collection: 'user_data'});
 
// var userModel=mongoose.model('users',userSchema);
 
module.exports = mongoose.model("User", userSchema);
