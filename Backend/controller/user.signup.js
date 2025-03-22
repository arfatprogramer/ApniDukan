const sendEmail = require("../config/sendEmail")
const userModel = require("../models/userModel")
const bcrypt =require("bcryptjs")
const verifyEmailTemplate = require("../utils/verifyEmailTemplate")

async function userSignUpController(req,res){
    try {
        
        const {firstName,lastName,email,password}=req.body
        
        if(!email){
            throw new Error("Please Provide Email")
        }

        // checking for email exists or not
        let findData= await userModel.findOne({email},{email:1})
       
        
        if( findData){
            throw new Error("User Already Exists")
        }

        
        if(!firstName){
            throw new Error("Please Provide First Name")
        }
       
        if(!lastName){
            throw new Error("Please Provide Last Name")
        }
        
        if(!password){
            throw new Error("Please Provide Password")
        }
        
        //Encrypting password into hash form
        const salt= await bcrypt.genSalt(10)
        const hashedPassword=bcrypt.hashSync(password,salt)

        if(!hashedPassword){
            throw new Error("Soothing went wrong");
            
        }

        const payload={
            ...req.body,
            password:hashedPassword
        }
        
         
        const userData=new userModel(payload)
        const saveUser=await userData.save()

         const VerifyEmailUrl = `${process.env.FRONTEND_URL}/verify-email?code=${saveUser?._id}`
        
                const verifyEmail = await sendEmail({
                    sendTo : email,
                    subject : "Verify email from ApniDukan",
                    html : verifyEmailTemplate({
                        name:firstName,
                        url : VerifyEmailUrl
                    })
                })
                
                

        res.status(200).json({
            data:saveUser,
            message:"User Created Successfully",
            error:false,
            success:true
        })

    } catch (err) {
        res.status(406).json({
            message:err.message || err,
            error:true,
            success:false
        })
    }
}

module.exports=userSignUpController