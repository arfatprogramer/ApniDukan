const productModel=require("../../models/productsModel")
const allProductController=async(req,res)=>{
    const venderId=req.id
    try {

        const allProduct=await productModel.find({venderId},{updatedAt:0}).sort({createdAt:-1})
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
module.exports= allProductController;