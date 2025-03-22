
const adminLogOutController=(req,res)=>{
    try {
        console.log(req.userId);
        res.clearCookie("adminToken")
        res.json({
            message:"logout successful",
            error:false,
            success:true
        })
    } catch (err) {
        res.json({
            message:err.message || err,
            error:true,
            success:false
        })
    }

}

module.exports=adminLogOutController