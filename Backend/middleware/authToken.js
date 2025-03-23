const jwt =require("jsonwebtoken")

async function authToken(req,res,next) {
    try {
        const token=req.body.token; 
        if(!token){
            return res.json({
                message:"User is Not Login",
                error:true,
                success:false
            })
        }else{
        // verify a token symmetric
        jwt.verify(token, process.env.TOKEN_SECRET_KEY, function(err, decoded) {
            if (err) {
                console.log("error : ",err);
            }
            req.id=decoded._id
            req.email=decoded.email        
            next();  
        });
    }
        
        
    } catch (err) {
        res.status(400).json({
            message:err.message || err,
            error:true,
            success:false
        })
    }

}

module.exports=authToken;