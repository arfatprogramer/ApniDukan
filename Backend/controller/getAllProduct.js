const productModel = require("../models/productsModel")

const getAllProductController = async (req, res) => {
    try {

        const allProduct=await productModel.find({},{updatedAt:0}).sort({createdAt:-1})
        
        res.json({
            message:" All Product",
            data:allProduct,
            error:false,
            success:true
        })

    } catch (err) {
        res.json({
            message: err.message,
            error: true,
            success: false
        })

    }
}

module.exports=getAllProductController