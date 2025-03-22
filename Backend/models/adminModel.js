const mongoose = require("mongoose")

const adminSchema= new mongoose.Schema({
    firstName:String,
    lastName:String,
    phoneNumber:Number,
    dob:String,
    email:{type:String,unique:true,required:true},
    password:{type:String,required:true},
    profile:{type:String,require:true,default:null},
},{
    timestamps:true
})


const adminModel= mongoose.model("admin",adminSchema)

module.exports=adminModel