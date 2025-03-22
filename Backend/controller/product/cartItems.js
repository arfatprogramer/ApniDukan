const cartModel = require("../../models/cartProduct")
const productModel = require("../../models/productsModel")

const cartItemsController = async (req, res) => {
    try {

        const userId = req.id // coming from auth middleware

        const data = await cartModel.find({ userId }).populate("productId")
        
        if (!data) {
            return res.json({
                message: "No Data Found",
                error: true,
                success: false
            })
        }

     

        res.json({
            message: "success",
            data: data,
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
module.exports = cartItemsController