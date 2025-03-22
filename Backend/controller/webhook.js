const OrderModel = require("../models/OrderModel");
const Stripe = require("../config/stripe");
const cartModel = require("../models/cartProduct");

const endpointSecret = process.env.STRIPE_ENDPOIN_SECRET_kEY; 

async function getLineItems(lineItems,address,userId) {
    if (lineItems?.data?.length) {
        for(const item of lineItems.data){
            const product =await Stripe.products.retrieve(item.price.product)
            const productId=product.metadata.productId
            const venderId=product.metadata.venderId
            const cartId=product.metadata.cartId
          
            const payload={
                "productId": productId,
                "venderId": venderId,
                "userId": userId,
                "quantity": item.quantity,
                "selling": item.price.unit_amount /100,
                paymentType:"Online",
                deliveryAddress:address,
                PaymentStatus:1
            }
            console.log(payload);
            // Insert data into Order Table
            const Order = new OrderModel(payload)
            const saveOrder = await Order.save()
            //remove form cart
            const data = await cartModel.findByIdAndDelete(cartId)
            
        }
    }
}

// http://localhost:3000/api/webhook
const webhooks = async (req, res) => {
    const sig = req.headers['stripe-signature']; // Signature from Stripe
    const event =JSON.stringify(req.body);

    const header= await Stripe.webhooks.generateTestHeaderString({
        payload:event,
        secret:endpointSecret,
    })
    
    let stripeEvent;

    try {
         stripeEvent= await Stripe.webhooks.constructEvent(event,header,endpointSecret)

    } catch (error) {
        res.status(400).send(`webhook Error: ${error.message}`)
        return;
    }


// Handle the event
  switch (stripeEvent.type) {
    case 'checkout.session.completed':
      const session = stripeEvent.data.object;
        const lineItems=await Stripe.checkout.sessions.listLineItems(session.id)
        let address=session.metadata.DeliveryAddress
        let userId=session.metadata.userId
        getLineItems(lineItems,address,userId)    
      break;
    
    default:
      console.log(`Unhandled event type ${stripeEvent.type}`);
  }

    res.status(200).send()
   
};

module.exports = webhooks;
