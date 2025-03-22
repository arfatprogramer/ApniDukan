const contactMOdel=require("../models/messageModel")
const contactFormController=async(req,res)=>{
    try {
        
        const {name,email,message}=req.body
       const saveMessage=new contactMOdel({name, email, message})
       const save=await saveMessage.save()
        
        console.log(save);
        
        res.json({
            message:"Thank you for reaching out!",
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
module.exports=contactFormController