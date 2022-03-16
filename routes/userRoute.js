const bcrypt = require('bcrypt')
const express = require('express')
const userRoutes = express.Router()
const jwt = require('jsonwebtoken')

const User = require('../schema/userSchema')


userRoutes.get('/', (req, res)=>{
    res.status(200).json({message: 'user routes up'})
})
userRoutes.post('/register', async (req, res)=>{
    let username = req.body
    let password = req.body.password
  let email = req.body
    let age = req.body.age
    let salt = Number(process.env.SALT)
    let hashPassword = await bcrypt.hash(password, salt)
    username.password = hashPassword
    if(age <= 18){
        res.status(400).json({message: 'must be 18 years old'})
    }
    User.create(username, (err, newUer)=>{
        if(err){
            console.log(err)
            res.status(400).json({message: err.message})
        }
        res.status(201).json({user: newUer})
    })
})
userRoutes.post('/login',(req,res)=>{
let username = req.body.username
let password = req.body.password

if(!password || !username){
    res.status(400).json({message: `Check ${username} and ${password}` })
}
 User.findOne({username: username}, (error, result)=>{
     if(error){
         res.status(400).json({message: error.message})
     }
     if(result === null || result === undefined){
         res.status(404).json({message: 'User not found'})
     }
     bcrypt.compare(password, result.password, (error, match)=>{
        if(error){
            res.status(400).json({message: error.message})
        } 
        if(match === false){
             res.status(400).json({message: `${username} does not match password`})
         }
         let token = jwt.sign(username, process.env.JWT_SECRET,)
         res.setHeader('Authorization', token)
         res.status(200).json({data: ` ${username} you are logged in token: ${token}`, token: token, username: username})
     })
 })
})


module.exports = userRoutes