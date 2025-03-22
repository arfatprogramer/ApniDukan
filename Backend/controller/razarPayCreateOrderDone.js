const cartModel = require("../models/cartProduct")
const OrderModel=require("../models/OrderModel")

const razarPayCreateOrderDone=async(req,res)=>{
    try {
        
        const {response,orderData}=req.body
        const {cartProductIdArray,productIdArray}=orderData
       
        // pdate Orders
       const updateOrder=await OrderModel.updateMany({_id:productIdArray},{$set:{paymentStatus:1}})
       
        console.log("Updated order model",updateOrder)
        // remove from cart
        const removeCartProduct=await cartModel.deleteMany({_id:cartProductIdArray})
        console.log("remove cart",removeCartProduct)

        res.status(200).json({
            message:"Order Placed",
            data:[],
            error:false,
            success:true
        })
        
    } catch (err) {
        res.status(400).json({
            message:err.message || err,
            error:true,
            success:false
        })
    }
}
module.exports=razarPayCreateOrderDone