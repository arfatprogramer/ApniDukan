const sendEmail = require("../config/sendEmail");
const ConfirmOrderTemplate = require("../utils/ConfirmOrderTemplate");
const generatedOtp  = require("../utils/generatedOtp");
const otpModel=require("../models/otpModel")

const sendOtpController= async (req,res)=>{
    try {
        const email=req.email
        const userId=req.id

        const otp=generatedOtp();
        const verifyOrder = await sendEmail({
            sendTo : email,
            subject : "Verify Order from ApniDukan",
            html :ConfirmOrderTemplate({name:"arfat",otp:otp})
        })

        const saveOtp=new otpModel({email:email,userId:userId,otp:otp})
        const newOtp= await saveOtp.save()
       
        res.status(200).json({
            message:"OTP Send To Gmail",
            otpId:newOtp._id,
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
module.exports=sendOtpController