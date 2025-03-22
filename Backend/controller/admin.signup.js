const jws=require("jsonwebtoken")
const bcrypt =require("bcryptjs")
const adminModel=require("../models/adminModel")

const adminSignupController=async (req,res)=>{
    try {
        const {firstName,email,password}=req.body;
        if (!firstName) {
            throw new Error("First name is required");
            
        }
        if (!email) {
            throw new Error("email is required");
            
        }
        if (!password) {
            throw new Error("password is required");
            
        }

        const getSalt=await bcrypt.genSalt(10)
        const hashPassword= await bcrypt.hash(password,getSalt);

        if (!hashPassword) {
            throw new Error("Something Went Wrong!");
            
        }

        const payload={
            ...req.body,
            password:hashPassword
        }

        const createNewAdmin =new adminModel(payload)
        const adminData=await createNewAdmin.save()

        if (!adminData) {
            throw new Error("Database error");
            
        }
        
        res.json({
            message:"successful",
            data:adminData,
            hashPassword:hashPassword,
            error:false,
            success:true
        })
    } catch (err) {
        res.json({
            message:err.message || err,
            error:true,
            success:false
        })
    }


}

module.exports=adminSignupController