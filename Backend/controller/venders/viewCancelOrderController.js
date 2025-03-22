const cancelModel=require("../../models/cancelModel")

const viewCancelOrderController=async(req,res)=>{
try {

    const venderId=req.id

    // const order=await OrderModel.find({userId}).populate("productModel")
    const order=await cancelModel.find({venderId}).populate("productId").sort({createdAt:-1}) 
    res.status(200).json({
        message:"Data",
        data:order,
        error:false,
        success:true
    })
    
} catch (err) {
    res.status(406).json({
        message:err.message || err,
        error:true,
        success:false
    })
}
}
module.exports=viewCancelOrderController