const userModel = require("../models/userModel")


const allUsers=async (req,res)=>{
    try {
        const data= await userModel.find({},{password:0}).sort({createdAt:-1})
    
        res.json({
            message:"User Data Founded",
            data:data,
            error:false,
            success:true
        })
    } catch (err) {
        res.json({
            message:err.message,
            error:true,
            success:false
        })
    }
}

module.exports=allUsers