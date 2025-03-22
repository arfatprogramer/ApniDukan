const cartModel = require("../models/cartProduct")
const OrderModel=require("../models/OrderModel")
const Razorpay=require("razorpay")


const razarPayCreateOrder=async(req,res)=>{
    try {
        
        let cartProductIdArray=[]
        let productIdArray=[]
        const userId=req.id

        const OrderData=req.body
        const productDetails = OrderData.productDetails
        const deliveryAddress=OrderData.DeliveryAddress._id
        const PaymentStatus=OrderData.PaymentStatus
        const TotalAmount=  Number(OrderData.TotalAmount.finalPrice)
                  

        if (productDetails.length==0) {
            throw new Error("You Don't have Any Product")
        }
    

        productDetails.map(async (item)=>{ 
            
            payload={
                "productId":item.productId._id,
                "venderId":item.productId.venderId,
                "userId":userId,
                "quantity":item.quantity,
                "selling":item.productId.selling,
                paymentType:"Online",
                deliveryAddress:deliveryAddress,
                paymentStatus:0,
            }

        // Insert data into Order Table
        const Order=new OrderModel(payload)
        const saveOrder=await Order.save()
        productIdArray.push(saveOrder._id)
     
        })
        
        // Remove data  from Product cart
        productDetails.map(async (e)=>{
            cartProductIdArray.push(e._id)
              
    })

 

    const razorPay = new Razorpay({
        key_id: process.env.RAZOR_PAY_KEY,
        key_secret: process.env.PAZOR_PAY_SECRET_KEY,
      });

      var options = {
        amount: ( TotalAmount * 100 ), 
        currency: "INR",
        receipt: "order_rcptid_11"
      };
      
      const order= await razorPay.orders.create(options);   
     

      const data={
        cartProductIdArray,
        productIdArray,
        order,
    }

        res.status(200).json({
            message:"Order Placed",
            data:data,
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
module.exports=razarPayCreateOrder