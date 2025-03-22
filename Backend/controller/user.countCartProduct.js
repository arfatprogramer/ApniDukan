const cartModel=require("../models/cartProduct")

const userCountCartProductController=async(req,res)=>{
    try {
       const userId =req.id

       const data = await cartModel.countDocuments({userId:userId})

        res.json({
            message: "success",
            data: data,
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
module.exports=userCountCartProductController