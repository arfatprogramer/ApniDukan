const userModel = require("../models/userModel");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");

async function userSigninController(req, res) {
    try {
        const { username, password } = req.body;

        if (!username) {
            throw new Error("Username Require");
        }

        if (!password) {
            throw new Error("Password Require");
        }

        // retrieve data for checking
        let data = await userModel.findOne({ email: username })

        if (!data) {
            throw new Error("Invalid Username")
        }

        const checkPassword = await bcrypt.compare(password, data.password)
        const jwtData={
            _id:data._id,
            email:data.email
        }
        if (checkPassword) {
            const loginToken = await jwt.sign(jwtData,process.env.TOKEN_SECRET_KEY,{ expiresIn: '8h' });

            const cookiesOption={
                httpOnly: true,
                secure:true

            }
            res.cookie("token",loginToken,cookiesOption).json({
                data: data,
                token:loginToken,
                message: "Login Successful",
                error: false,
                success: true
            })
            

        } else {
            throw new Error("Invalid Password")

        }

    } catch (err) {
        res.status(400).json({
            message: err.message || err,
            error: true,
            success: false
        })
    }


}

module.exports = userSigninController;