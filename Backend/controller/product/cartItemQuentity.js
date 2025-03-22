const cartModel = require("../../models/cartProduct");


const cartItemQuantityController = async (req, res) => {
    try {

        const userId = req.id // coming from auth middleware
        const {_id,quantity,action}=req.body
        let data;
      
        if (action=="pluse") {
             data = await cartModel.updateOne({productId:_id},{quantity:quantity+1}) 
        }
        if (action=="min") {
            data = await cartModel.updateOne({productId:_id},{quantity:quantity-1}) 
        }
        if (action=="remove") {
             data = await cartModel.deleteOne({productId:_id})
        }
        

        res.json({
            message: "success",
            // data:data,
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
module.exports = cartItemQuantityController