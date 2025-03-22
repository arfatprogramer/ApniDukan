const mongoes = require("mongoose")

const productCartSchema = new mongoes.Schema({
    productId:{
        ref:"productModel",
        type:String
    },
    userId:String,
    quantity:Number,
    selling: Number,
    productCategory: String,
}, {
    timestamps: true
})

const cartModel = mongoes.model("productCart", productCartSchema)
module.exports = cartModel