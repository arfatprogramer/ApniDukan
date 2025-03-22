const cartModel = require("../models/cartProduct")
const OrderModel=require("../models/OrderModel")
const otpModel=require("../models/otpModel")

const placeOrderController=async(req,res)=>{
    try {
        
        const OrderData=req.body
        const productDetails = OrderData.productDetails
        const PaymentType=OrderData.PaymentType
        const deliveryAddress=OrderData.DeliveryAddress._id
        const PaymentStatus=OrderData.PaymentStatus
        const TotalAmount=OrderData.TotalAmount
               

        if (productDetails.length==0) {
            throw new Error("You Don't have Any Product")
        }
        
        const verifyOtp= await otpModel.findById(req.body.otpId)
        if (verifyOtp) {
            dbOtp=verifyOtp.otp
            otp=req.body.otp

            if (dbOtp != otp) {
                throw new Error("Invalid Otp")
            }
        }
        
        productDetails.map(async (item)=>{ 
            
            payload={
                "productId":item.productId._id,
                "venderId":item.productId.venderId,
                "userId":item.userId,
                "quantity":item.quantity,
                "selling":item.productId.selling,
                paymentType:PaymentType,
                deliveryAddress:deliveryAddress,
                paymentStatus:PaymentStatus,
            }
             // Insert data into Order Table
        const Order=new OrderModel(payload)
        const saveOrder=await Order.save()
     
        })
        
        

        // Remove data  from Product cart
        productDetails.map(async (e)=>{
            const data=await cartModel.findByIdAndDelete(e._id)    

    })
        
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
module.exports=placeOrderController