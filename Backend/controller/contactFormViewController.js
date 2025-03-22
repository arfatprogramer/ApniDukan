const contactMOdel=require("../models/messageModel")
const contactFormViewController=async(req,res)=>{
    try {
        
        const data=await contactMOdel.find().sort({createdAt:-1})

        res.json({
            message:"data",
            data:data,
            success:true,
            error:false
        })
        
    } catch (err) {
        res.json({
            message:err.message || err,
            success:false,
            error:true
        })
    }
}
module.exports=contactFormViewController