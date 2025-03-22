const adminModel =require("../models/adminModel")
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");

const adminLoginController=async(req,res)=>{
   try {
    
    const {username,password}=req.body;

    if (!username) {
        throw new Error("username Required")
    }
    if (!password) {
        throw new Error("password Required")
    }

    const data=await adminModel.findOne({email:username});
    
    
    if(!data) return res.status(404).json({message:"Admin not found"});
    
    const verifyPassword=await bcrypt.compare(password,data.password)
    if(!verifyPassword) throw new Error(" Invalid Password");

    const token=jwt.sign({_id:data._id},process.env.ADMIN_TOKEN_SECRET_KEY,{expiresIn:'8h'})
     CookiesOptions={
        httpOnly:true,
        secure:true
     }
    
    res.cookie("adminToken",token,CookiesOptions).status(200).json({
            message: "Login Successful",
            data:username,
            error:false,
            success:true
        })
   } catch (err) {
    res.json({
        message: err.message || err,
        error:true,
        success:false
    })
   }
}

module.exports=adminLoginController