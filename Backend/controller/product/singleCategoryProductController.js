const productModel = require("../../models/productsModel")

const singleCategoryProductController = async (req, res) => {
    try {
        // console.log(req.body.category);

        // const Categories = await productModel.distinct("productCategory")
        const ProductCategory = []

        // for (const ca of Categories) {
            const data = await productModel.find({ productCategory: req.body.category })
            ProductCategory.push(data)
        // }

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

module.exports = singleCategoryProductController