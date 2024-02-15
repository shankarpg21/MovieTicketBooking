const jwt=require('jsonwebtoken');

const validateTokenHanlder=(req,res,next)=>{
    try{
        let token;
        let authHeader=req.headers.authorization
        if(authHeader && authHeader.startsWith('Bearer')){
            token=authHeader.split(" ")[1]
            jwt.verify(token,process.env.ACCESS_TOKEN_ADMIN,(err,decode)=>{
                if(err){
                    res.status(400).send("Admin is not authorized");
                }
                req.user=decode.user;
                next();
            })
            if(!token){
                res.status(400).send("Token is expired");
            }
        }
    }
    catch(e){
        console.log(e);
        res.status(400).json({e})
    }
}

module.exports=validateTokenHanlder;