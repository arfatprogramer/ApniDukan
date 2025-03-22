const OrderModel=require("../../models/OrderModel")
const viewVenderOrderController=async(req,res)=>{
try {

    const venderId=req.id

    // const order=await OrderModel.find({userId}).populate("productModel")
    const order=await OrderModel.find({venderId,
        '$or': [
            {
                '$and': [
                    { 'paymentType': "Online" },
                    { 'paymentStatus': 1 }
                ]
            },
            { 'paymentType': "Cash On Delivery" },
        ]
    }).populate("productId").sort({createdAt:-1}) 
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
module.exports=viewVenderOrderController