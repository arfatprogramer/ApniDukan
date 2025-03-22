const productModel =  require("../../models/productsModel")

const getProductById=async (req,res)=>{
    try {
        if (!req.body._id) {
            throw new Error("Please Provide Product ID");
            
        }
        const data = await productModel.findById(req.body._id)
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
module.exports=getProductById