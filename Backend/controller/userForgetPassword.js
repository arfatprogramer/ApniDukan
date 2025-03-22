const sendEmail = require("../config/sendEmail");
const otpModel = require("../models/otpModel");
const userModel = require("../models/userModel");
const forgotPasswordTemplate = require("../utils/forgotPasswordTemplate");
const generatedOtp = require("../utils/generatedOtp");

const forgotPasswordControler= async (req,res)=>{
    try {
        
        const {username} = req.body;
        const user = await userModel.findOne({email:username});
       if (user==null || user.length ==0  ) {
        throw new Error("Invalid username")
       } 
       const name=user.firstName;
       const otp=generatedOtp();
       const verifyOrder = await sendEmail({
           sendTo : username,
           subject : "Verify Order from ApniDukan",
           html :forgotPasswordTemplate({name:name,otp:otp})
       })
       const otpData ={
        email:username,
        userId:user._id,
        otp:otp,
       }

        const storeOtp=new otpModel(otpData)
        const newDtoredata= await storeOtp.save()
        
        
        res.status(200).json({
            message:"Otp send SuccessFully",
            data:newDtoredata._id,
            error:false,
            success:true
        })
    } catch (err) {
        res.status(200).json({
            message:err.message || err,
            error:true,
            success:false
        })
    }
}

module.exports=forgotPasswordControler