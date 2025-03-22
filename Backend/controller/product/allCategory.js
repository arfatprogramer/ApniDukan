const productModel = require("../../models/productsModel")


const allCategory = async (req,res) => {
    
    try {

        const Categories = await productModel.distinct("productCategory")
        const ProductCategory= []

        for (const ca of Categories) {
            const data = await productModel.findOne({productCategory:ca})
            ProductCategory.push(data)
        }

        res.json({
            message: " All Product",
            data: ProductCategory,
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

module.exports = allCategory