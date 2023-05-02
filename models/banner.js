const mongoose = require('mongoose')
const bannerschema = mongoose.Schema({

    header:{
        type:String,
        required:true
    },

    banner_text_down:{
        type:String,
        required:true
    },
    images:{
        type:Array,
        require:true
    }

})
const bannerModel = mongoose.model('bannerdetails',bannerschema)
module.exports = bannerModel