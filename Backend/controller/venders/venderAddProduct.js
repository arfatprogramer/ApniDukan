const productModel = require("../../models/productsModel");

const venderAddProductController = async (req, res) => {
    try {
        const { productName, brandName, productPrice, selling, Description, productImage, productCategory } = req.body;
        const productData = req.body
        const venderId=req.id
        console.log(productData);


        if (!productName) {
            throw new Error("Product name is required");
        }
        if (!brandName) {
            throw new Error("Brand name is Required");
        }

        if (!productCategory) {
            throw new Error("productCategory  is required");
        }

        if (!productImage) {
            throw new Error("productImage  is required");
        }

        if (!selling) {
            throw new Error("selling prise is required");
        }

        if (!productPrice) {
            throw new Error("product Price is required");
        }
        if (!Description) {
            throw new Error("Description is required");
        }
        const payload={
            ...req.body,
            venderId:req.id,
        }
        const product = new productModel(payload);
        const productSave = await product.save()


        console.log(payload);


        res.json({
            message: "Product Created",
            data: productSave,
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

module.exports = venderAddProductController 
