const express = require('express')
const helmet = require('helmet')
const bodyParser = require('body-parser')
const dotenv = require('dotenv')
const morgan = require('morgan')

dotenv.config()
const app = express()
const port = process.env.PORT || 314

app.use(helmet())
app.use(bodyParser.json())
app.use(morgan('dev'))


app.get('/', (req,res)=>{
    res.status(200).json({message: 'Backend API up'})
})
app.listen(port, ()=>{
    console.log(`Server listing at ${port}`)
})