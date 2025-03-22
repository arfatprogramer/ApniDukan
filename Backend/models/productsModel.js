const mongoes=require("mongoose")

const productSchema= new mongoes.Schema({
     productName:String,
            brandName: String,
            productPrice: Number,
            selling: Number,
            Description: String,
            productImage: [],
            productCategory: String,
            productColor:String,
            venderId:{
                ref:"userModel",
                type:String
            },
            stock:Number,
},{
    timestamps:true
})

const productModel = mongoes.model("productModel",productSchema)


module.exports=productModel