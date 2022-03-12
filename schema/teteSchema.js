const mongoose = require('mongoose')

const teteSchema = new mongoose.Schema({

username: {type: String, required: true},
nickname: {type: String, required: true},
teteatete: {type: String, required: true},
created_at:{type: Date, required: false, default: Date.now},
private: {type: Boolean, default: false}
})

const teteModel = mongoose.model('Tete', teteSchema)
module.exports = teteModel