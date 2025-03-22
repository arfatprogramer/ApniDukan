const adminModel = require("../models/adminModel");


const adminProfileUpdateController = async (req, res) => {
    try {

        const userData = req.body
        const _id=req.id;
       
        

        if (!userData) {
            throw new Error("Please Provide Data");

        }

        
        const data = await adminModel.findByIdAndUpdate(_id, userData)
        res.json({
            message: "User Updated",
            data: data,
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

module.exports = adminProfileUpdateController