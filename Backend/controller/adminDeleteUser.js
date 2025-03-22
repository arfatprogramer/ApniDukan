const userModel = require("../models/userModel");

const adminDeleteUser = async (req, res) => {
    try {

        const{_id} = req.body    
        const data = await userModel.findByIdAndDelete(_id)
        res.json({
            message: "User Deleted",
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

module.exports = adminDeleteUser