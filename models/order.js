const mongoose = require('mongoose')
const orderSchema = mongoose.Schema({
    user:{
        type:mongoose.Schema.Types.ObjectId,
        ref:'UserModel'
    },
    order:[{
        product:{
            type:mongoose.Schema.Types.ObjectId,
            ref:'product'
        },
        quantity:{
            type:Number,
            required:true
        },
        totalPrice:{
            type : Number,
            required:true
        },
        status:{
            type:String,
            required:true,
            default: "pending"
        },payment_type
        :{
            type:String,
            require:true,
            
        },
        date:{
            type:String,
            require:true,
            
        },
        arrive_date:{
            type:String,
            require:true,
        },
        return_date:{
            type:Date,
            require:true
        }
    }],
    grandTotal:{
        type:Number,
        required:true
    },
    address:{
        type:Object,
        required:true
    }
    })

const orderModel = mongoose.model('order',orderSchema)
module.exports = orderModel