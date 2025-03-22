async function userLogoutController(req,res) {
    try {
        res.clearCookie('token');
        res.json({
            data:[],
            message:"logout Successful",
            error:false,
            success:true,
        })
    } catch (err) {
        res.json({
            message:err.message,
            error:true,
            success:false,
        })
    }
}

module.exports=userLogoutController