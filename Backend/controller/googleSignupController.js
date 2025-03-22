const { jwtDecode } = require("jwt-decode");
const sendEmail = require("../config/sendEmail");
const googleSignUp = require("../utils/googleSignUp");
const userModel = require("../models/userModel")
const googleSignupController = async (req, res) => {
    try {
        const { token, userType } = req.body
        const decoded = jwtDecode(token);
        const random = await Math.floor(1000 + Math.random() * 9999);

        const data = {
            firstName: decoded.given_name,
            lastName: decoded.family_name,
            email: decoded.email,
            password: decoded.family_name + random,
            profile: decoded.picture,
            userType: userType,
            email_verified: 1,
        }

        // checking for email exists or not
        let findData = await userModel.findOne({ email: data.email }, { email: 1 })


        if (findData) {
            throw new Error("User Already Exists")
        }

        const verifyEmail = await sendEmail({
            sendTo: data.email,
            subject: "Verify email from ApniDukan",
            html: googleSignUp({ name: data.firstName, email: data.email, password: data.password })
        })

        const userData=new userModel(data)
        const saveUser=await userData.save()



        res.json({
            message: "Username and Password Send to Your Email",
            data:saveUser,
            success: true,
            error: false
        })

    } catch (er) {
        res.json({
            message: er.message || er,
            success: false,
            error: true
        })
    }
}
module.exports = googleSignupController