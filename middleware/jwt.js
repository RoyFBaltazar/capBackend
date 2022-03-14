const jwt = require('jsonwebtoken')

function verifyToken(req, res, next){
    let token = req.get('Authorization')
    if(token === null){
        res.status(403).json({message: "login with token please"})
    }
    jwt.verify(token, process.env.JWT_SECRET, (error, result)=>{
        if(error){
            res.status(400).json({message: error.message})
        }
        if(result === false){
            res.status(403).json({message:"Check token "})
        }
        next()
    })
}
module.exports = verifyToken