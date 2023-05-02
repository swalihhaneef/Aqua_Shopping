const mongoose = require('mongoose')
const couponSchema =new mongoose.Schema({
    couponId:{
        type:String,
        required:true,
        unique:true
    },
    expiryDate:{
        type:String,
        required:true
    },
    minAmount:{
        type:Number,
        required:true
    },
    discount:{
        type:Number,
        required:true
    },
    status:{
        type:Boolean,
       default:true
    },
    max_discount:{
        type:Number,
        required:true
    }
})
const couponModel =  mongoose.model('coupon',couponSchema)
module.exports = couponModel
