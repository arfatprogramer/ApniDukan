const cancelModel = require("../models/cancelModel")
const OrderModel = require("../models/OrderModel")


const cancelOrderController = async(req,res) => {
  try {
    const data=req.body
    const orderID=data.Orderid
    
    const cancelProduct= await OrderModel.find({_id:orderID})
     
    const payload={
      productId:cancelProduct[0].productId,
      venderId:cancelProduct[0].venderId,
      userId:cancelProduct[0].userId,
      paymentType:cancelProduct[0].paymentType,
      selling:cancelProduct[0].selling,
      quantity:cancelProduct[0].quantity,
      deliveryAddress:cancelProduct[0].deliveryAddress,
      deliveryStatus:data.Status,
      resion:data.resion,

    }
    const saveCancel=new cancelModel(payload)
    const CancelData = await saveCancel.save()
    
    const cancelData= await OrderModel.deleteOne({_id:orderID})

    
    res.status(200).json({
        message:"Order Cancel Succesful",
        data:cancelData,
        error:false,
        success:true
    })
    
  }  catch (err) {
    res.status(200).json({
        message:err.message || err,
        error:true,
        success:false
    })
}
}

module.exports=cancelOrderController
