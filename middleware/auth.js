const jwt = require('jsonwebtoken');
const JWT_SECRETE  = "$uperMan1212";

module.exports = (req,res,next)=>{
const token = req.headers.authorization?.split(' ')[1];
    console.log(token);
    if(!token){
        return res.status(401).json({
            message:"token missing"
        })
    }
    try{
        const decode = jwt.verify(token,JWT_SECRETE);
        req.user = decode;
        next();
    }
    catch(err){
        return res.status(401).json({
            message:'Invalid token'
        })
    }
}
