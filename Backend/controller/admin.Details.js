const { model } = require("mongoose");
const adminModel=require("../models/adminModel")

const adminDetailController=async (req,res)=>{
try {
    const data= await adminModel.findById(req.id,{_id:0,password:0})
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

module.exports=adminDetailController