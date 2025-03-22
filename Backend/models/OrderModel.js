const mongoes = require("mongoose")

const OrderModelSchema = new mongoes.Schema({
    productId:{ref:"productModel",type:String},
    venderId:{ref:"user",type:String},
    userId:{ref:"user",type:String},
    paymentType:String,
    deliveryAddress:{ref:"Address",type:String},
    paymentStatus: Number,
    deliveryStatus: {default:'Pending ',type:String},
    quantity: Number,
    selling: Number,
    
}, {
    timestamps: true
})

const OrderModel = mongoes.model("Order", OrderModelSchema)
module.exports = OrderModel