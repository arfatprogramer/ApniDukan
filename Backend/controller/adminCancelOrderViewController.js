const cancelModel = require("../models/cancelModel")
const OrderModel = require("../models/OrderModel")


const adminCancelOrderViewController = async(req,res) => {
  try {
   
    const data=await cancelModel.find().populate("productId").populate("userId").sort({updatedAt:-1})

    
    res.status(200).json({
        message:"Cancel Orderd Data",
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

module.exports=adminCancelOrderViewController
