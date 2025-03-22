const productModel = require("../models/productsModel");

const adminDeleteProduct = async (req, res) => {
    try {

        const{_id} = req.body    
        const data = await productModel.findByIdAndDelete(_id)
        res.json({
            message: "Product Deleted",
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

module.exports = adminDeleteProduct