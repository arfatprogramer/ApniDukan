const userModel = require("../models/userModel");

const adminUpdateUserController = async (req, res) => {
    try {

        const userData = req.body.updateUserData 
        console.log(userData);
        
        const _id=userData._id;
        if (!userData) {
            throw new Error("Please Provide Data");

        }

        
        
        const data = await userModel.findByIdAndUpdate(_id, userData)
        res.json({
            message: "User Updated",
            data: [],
            error: false,
            success: true
        })


    } catch (err) {
        res.json({
            message: err.message || err,
            error: true,
            success: false
        })
    }
}

module.exports = adminUpdateUserController