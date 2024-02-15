const jwt=require('jsonwebtoken');

const validateTokenHanlder=(req,res,next)=>{
    try{
        let token;
        let authHeader=req.headers.authorization
        if(authHeader && authHeader.startsWith('Bearer')){
            token=authHeader.split(" ")[1]
            jwt.verify(token,process.env.ACCESS_TOKEN_USER,(err,decode)=>{
                if(err){
                    res.status(400).send("User is not authorized");
                }
                req.user=decode.user;
                next();
            })
        }
        else{
            return res.status(400).send("Token is not passed");
        }
    }
    catch(e){
        console.log(e);
        res.status(400).json({e})
    }
}

module.exports=validateTokenHanlder;