const userModel =require("../models/userModel")

async function userDetailController(req,res) {
    try {
        console.log("User data is Fetched");
        
        const user=await userModel.findById(req.id)

        res.status(200).json({
            message:"success",
            data:user,
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

module.exports=userDetailController;