const express = require('express')
const helmet = require('helmet')
const bodyParser = require('body-parser')
const dotenv = require('dotenv')
const morgan = require('morgan')
const mongoConnect = require('./config')
const cors = require('cors')
const userRoutes = require('./routes/userRoute')
const teteRoute = require('./routes/tete')

dotenv.config()
const app = express()
const port = process.env.PORT || 314

app.use(cors({
    origin: "*",
    
}))
app.use(helmet())
app.use(bodyParser.json())
app.use(morgan('dev'))
app.use('/auth', userRoutes)
app.use('/tete', teteRoute)


app.get('/', (req,res)=>{
    res.status(200).json({message: 'Backend API up'})
})
app.listen(port, ()=>{
    mongoConnect()
    console.log(`Server listing at ${port}`)
})