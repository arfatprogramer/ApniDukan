const productModel = require("../../models/productsModel")


const filterProductCategoryController = async (req,res) => {
    
    try {
        const category=req?.body?.category || []
        const Categories = await productModel.find({
            productCategory :{
                "$in":category
            }
        })
       

        

        res.json({
            message: " All Product",
            data: Categories,
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

module.exports = filterProductCategoryController