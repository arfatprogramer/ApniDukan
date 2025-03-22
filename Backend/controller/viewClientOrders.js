const OrderModel=require("../models/OrderModel")
const viewClientOrderController=async(req,res)=>{
try {
    
    const userId=req.id

    // const order=await OrderModel.find({userId}).populate("productModel")
    const order=await OrderModel.find({userId,
        '$or': [
            {
                '$and': [
                    { 'paymentType': "Online" },
                    { 'paymentStatus': 1 }
                ]
            },
            { 'paymentType': "Cash On Delivery" },
        ]
    }).populate("productId")

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
module.exports=viewClientOrderController