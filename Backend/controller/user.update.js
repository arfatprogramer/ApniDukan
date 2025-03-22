const userModel = require("../models/userModel");

const userDataUpdateController=async(req,res)=>{

try {
    const userData=req.body
    const _id=req.id
    console.log(req.body);
    
    const user=await userModel.findByIdAndUpdate(_id,{...userData})
    res.status(200).json({
        message:"Data Update Successfully",
        data:user,
        error:false,
        success:true
    })
    
} catch (err) {
    res.status(406).json({
        message:err.message || err,
        error:true,
        success:false
    })
}

}
module.exports=userDataUpdateController