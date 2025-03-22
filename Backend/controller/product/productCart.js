const cartModel=require("../../models/cartProduct")

const productCartController=async(req,res)=>{
    try {
       const {productId}=req.body
       const userId =req.id
    

       const Payload={
        productId: productId,
        userId:userId,
        quantity:1,
        selling: 120,
        productCategory: "String",
       }

       const data = await cartModel.exists({$and:[{userId},{productId}]})
       if(data){
        return res.json({
            message:" already exists in cart",
            error:true,
            success:false
        })
        }
        const cartProduct = new cartModel(Payload)
        cartProduct.save()
        
        // const data = await productModel.findById(req.body._id)

        res.json({
            message: "success",
            data: cartProduct,
            error: false,
            success: true
        })

    } catch (err) {
        res.json({
            message: err.message,
            error: true,
            success: false
        })

    }
}
module.exports=productCartController