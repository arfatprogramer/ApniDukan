const OrderModel=require("../../models/OrderModel")
const orderUpdateController=async(req,res)=>{
try {

    const {value,OrderId}=req.body
    console.log(value,OrderId);
    const updateOrder=await OrderModel.updateOne({_id:OrderId},{$set:{deliveryStatus:value}})

    res.status(200).json({
        message:"Updated",
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
module.exports=orderUpdateController