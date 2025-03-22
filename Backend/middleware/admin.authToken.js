const jwt = require("jsonwebtoken")

const adminAuthToken=async (req,res,next)=>{
    try {
        // console.log(req.cookies.token);
        const token=req?.cookies?.adminToken
        
        
        if (!token) {
            return  res.json({
                message:" Admin Not Login",
                error:true,
                success:false
            })
        }

        jwt.verify(token,process.env.ADMIN_TOKEN_SECRET_KEY,(err,decode)=>{

           if (decode) {
           
            req.id=decode._id
            
           }
           if (err) {
            console.log(err);
            console.log("error");
            
            
           }
        })
        

        next()      
        
    } catch (err) {
        res.json({
            message:err.message || err,
            error:true,
            success:false
        })
    }
    

}

module.exports=adminAuthToken