const otpModel = require("../models/otpModel");
const bcrypt =require("bcryptjs");
const userModel = require("../models/userModel");

const userResetPasswordController = async (req, res) => {
    try {
        console.log(req.body);
        const { otp, password, confirmPassword, otpId } = req.body
        const user = await otpModel.findOne({ _id: otpId })
        if (!user) {
            throw new Error("Invalid OTP")
        }
        if (user.otp == otp) {
            console.log("Success");
            // Write here to Update new Password
            //Encrypting password into hash form
            const salt = await bcrypt.genSalt(10)
            const hashedPassword = bcrypt.hashSync(password, salt)

            if (!hashedPassword) {
                throw new Error("Soothing went wrong");
            }
            // Update user password
            const update=await userModel.findByIdAndUpdate(user.userId,{$set:{password:hashedPassword}})
            
        }
        else {
            throw new Error("Invalid OTP")
        }

        res.status(200).json({
            message: "Password Reset Successful",
            error: false,
            success: true
        })
    } catch (err) {
        res.status(200).json({
            message: err.message || err,
            error: true,
            success: false
        })
    }
}

module.exports = userResetPasswordController