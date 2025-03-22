const stripe =require("../config/stripe")
const paymentController = async (req, res) => {
    try {

        const OrderData = req.body
        const email=req.email 
        const userId=req.id 
        const productDetails = OrderData.productDetails
        const DeliveryAddress = OrderData.DeliveryAddress._id

        
        
        if (productDetails.length==0) {
            throw new Error("You Don't have Any Product")
        }

        const payment={
            submit_type:"pay",
            mode:"payment",
            payment_method_types:["card"],
            billing_address_collection:"auto",
            customer_email:email,
            metadata:{
                userId,
                DeliveryAddress
            },
            line_items: OrderData.productDetails.map((item)=>{
                
                return{
                    price_data:{
                        currency:"inr",
                        product_data:{
                            name:item.productId.productName,
                            images:item.productId.productImage,
                            metadata:{
                                productId:item.productId._id,
                                venderId:item.productId.venderId,
                                cartId:item._id,
                            }
                        },
                        unit_amount:item.productId.selling *100
                    },
                    adjustable_quantity:{
                        enabled:true,
                        minimum:1
                    },
                    quantity:item.quantity,

                }
            }), 
            success_url: `${process.env.FRONTEND_URL}/success`,
            cancel_url: `${process.env.FRONTEND_URL}/cancel`,
          }

        const session = await stripe.checkout.sessions.create(payment);
        
        res.status(303).json(session)

    } catch (err) {
        res.status(400).json({
            message: err.message || err,
            error: true,
            success: false
        })
    }
}
module.exports = paymentController