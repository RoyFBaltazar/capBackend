const bcrypt = require('bcrypt')
const Tete = require('../schema/teteSchema')
const User = require('../schema/userSchema')



function loginTete(req, res, next){
    let username = req.body.username
    let password = req.body.password
    if(!password || !username){
        res.status(400).json({messsage: ` check ${username} or ${password}`})
    }
    User.findOne({username: username},(error, result)=>{
        if(error){
            res.status(400).json({messsage: error.messsage})
        }
        if(result === null || result === undefined){
            res.status(404).json({messsage: `${username} not found`})
        }
        bcrypt.compare(password, result.password, (error, match)=>{
        if(error){
            res.status(403).json({messsage: error.message})
        }
        if(match === false){
            res.status(403).json({message: "Passsword doesnt match Username"})
        }
        res.status(200).json({data: `${result.username} test`})
        })
    })
    next()
   
}
module.exports = loginTete