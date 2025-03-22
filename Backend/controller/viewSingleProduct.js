const OrderModel = require("../models/OrderModel");

const viewSingleProduct = async(req,res) => {
  try {
   const {_id}=req.body
   
   
    const data=await OrderModel.find({_id}).populate("productId").populate("deliveryAddress")
                                        .populate("userId",{profile:0,password:0,email_verified:0})
                                        .populate("venderId",{profile:0,password:0,email_verified:0}).sort({updatedAt:-1})
    console.log(data);
    
   
    res.status(200).json({
        message:"Cancel Order Data",
        data:data,
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

module.exports=viewSingleProduct
