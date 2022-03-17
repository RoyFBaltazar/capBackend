const express = require('express')
const User = require('../schema/userSchema')
const teteRoute = express.Router()
const Tete = require('../schema/teteSchema')
const login = require('../middleware/tetelogin')
const verifyToken = require('../middleware/jwt')


teteRoute.get('/', (req, res)=>{
  Tete.find({private: false}, (error, result)=>{
      if(error){
          res.status(403).json({message: error.message})
      }
      if(result === null || result === undefined || result === []){
        res.status(404).json({message: "NOT FOUND"})
    }
    res.status(200).json({data: result})

  })
   
})
teteRoute.get('/username/:username', (req,res)=>{
let username = req.params.username
Tete.find({username: username},(error,result)=>{
    if(error){
        res.status(400).json({message: error.message})
    }
    else(    res.status(200).json({message: result})
    )
   
})
} )
teteRoute.post('/username/:username', verifyToken, (req, res)=>{
    let username = req.params.username
    
    let newTete = req.body
    
    User.findOne({username: username}, (error, result)=>{
        if(error){
            res.status(400).json({message: error.message})
        }
        if(result === null || result === undefined){
            res.status(404).json({message: `${username} not found`})
        }
        if(result.username !== username){
            res.status(400).json({message: "does not match user"})
        }
    })
    Tete.create(newTete, (error, newTetemsg)=>{
    
        if(error){
            res.status(400).json({message: error.message})
        }
        res.status(200).json({message: newTetemsg})
    })
})
teteRoute.delete('/username/:username',login, verifyToken ,(req, res)=>{
    let username = req.params.username
    let password = req.body
   
    let id = req.body
    
    User.findOne({username: username}, (error, result)=>{
        if(error){
            res.status(400).json({message: error.message})
        }
        if(result === null || result === undefined){
            res.status.json({message: `${username} not found`})
        }
        if(result.username !== username){
            res.status(403).json({message: "does not match user"})
        }
    })
    Tete.findOneAndDelete(id, (error, deletedTetemsg)=>{
    
        if(error){
            res.status(400).json({message: error.message})
        }
        res.status(200).json({message: deletedTetemsg})
    })
})
teteRoute.put('/username/:username', login, verifyToken, (req, res)=>{
    let username = req.params.username
    let password = req.body
   
    let id = req.body.id
    let teteatete = req.body.teteatete
    
    User.findOne({username: username}, (error, result)=>{
        if(error){
            res.status(400).json({message: error.message})
        }
        if(result === null || result === undefined){
            res.status(404).json({message: `${username} not found`})
        }
        if(result.username !== username){
            res.status(403).json({message: "does not match user"})
        }
    })
    Tete.findByIdAndUpdate(id, teteatete, (error, updatedTetemsg)=>{
    
        if(error){
            res.status(400).json({message: error.message})
        }
        res.status(200).json({message: updatedTetemsg})
    })
})



module.exports = teteRoute