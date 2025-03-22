const addressModel = require("../../models/addressModel")

const getUserAddressController = async (req, res) => {
    try {

        const userid = req.id

        const userAddress = await addressModel.find({userid})
        res.json({
            message: "User Address",
            data: userAddress,
            error: false,
            success: true
        })

    } catch (err) {
        res.json({
            message: err.message,
            error: true,
            success: false
        })

    }
}

module.exports=getUserAddressController