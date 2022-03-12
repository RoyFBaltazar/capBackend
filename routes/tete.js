const express = require('express')
const User = require('../schema/userSchema')
const teteRoute = express.Router()
const Tete = require('../schema/teteSchema')

teteRoute.get('/', (req, res)=>{
    // let username= req.body
    // let password= req.body
    res.status(200).json({message: 'works'})
})
teteRoute.post('/username/:username', (req, res)=>{
    let username = req.params.username
    // let password = req.body
    let newTete = req.body
    
    User.findOne({username: username}, (error, result)=>{
        if(error){
            res.status(400).json({message: error.message})
        }
        if(result === null || result === undefined){
            res.status.json({message: `${username} not found`})
        }
    })
    Tete.create(newTete, (error, newTete)=>{
        if(error){
            res.status(400).json({message: error.message})
        }
        res.status(201).json({message: newTete})
    })
})
module.exports = teteRoute