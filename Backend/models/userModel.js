const mongoose = require("mongoose")

const userSchema= new mongoose.Schema({
    firstName:String,
    lastName:String,
    phoneNumber:Number,
    dob:String,
    email:{type:String,unique:true,required:true},
    password:{type:String,required:true},
    profile:String,
    userType:String,
    email_verified:{type:String,default:false},
},{
    timestamps:true
})


const userModel= mongoose.model("user",userSchema)

module.exports=userModel