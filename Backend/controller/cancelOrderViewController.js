const cancelModel = require("../models/cancelModel")

const cancelOrderViewController = async(req,res) => {
  try {
    const {_id}=req.body
    const data=await cancelModel.find({_id}).populate("productId").populate("deliveryAddress")
                                        .populate("userId",{profile:0,password:0,email_verified:0})
                                        .populate("venderId",{profile:0,password:0,email_verified:0}).sort({updatedAt:-1})
    
   
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

module.exports=cancelOrderViewController
