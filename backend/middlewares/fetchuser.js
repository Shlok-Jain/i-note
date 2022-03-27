var jwt = require('jsonwebtoken');
const JWT_SECRET = "shloksecretverysecretjwtjwt"

const fetchuser = (req,res,next)=>{
    const token = req.header('authtoken')
    if(!token){
        res.status(401).json({error:"Please login using valid token"})
    }
    try {
        const data = jwt.verify(token,JWT_SECRET)
        req.user = data.user  
    } catch (error) {
        res.status(401).json({error:"Please login using valid token"})
    }
    
    next()
}

module.exports = fetchuser