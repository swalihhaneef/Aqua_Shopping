const mongoose = require('mongoose')
const { Schema } = mongoose;

const catogorySchema =new mongoose.Schema({
    _id: {
        type: Schema.Types.ObjectId,
        default: mongoose.Types.ObjectId
      },
    name:{
        type:String,
        required:true,
        uppercase:true
    },
    
})
const catogoryModel = mongoose.model('catogory',catogorySchema)
module.exports = catogoryModel