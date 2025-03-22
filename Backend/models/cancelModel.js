const mongoes = require("mongoose")

const cancelModelSchema = new mongoes.Schema({
    productId:{
        ref:"productModel",
        type:String
    },
    venderId:{ref:"user",type:String},
    userId:{ref:"user",type:String},
    quantity:Number,
    selling: Number,
    productCategory: String,
    deliveryStatus: String,
    deliveryAddress:{ref:"Address",type:String},
    resion: String,
}, {
    timestamps: true
})

const cancelModel = mongoes.model("cancelOrders", cancelModelSchema)
module.exports = cancelModel