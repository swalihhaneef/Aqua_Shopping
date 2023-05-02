const mongoose=require('mongoose')
const cartSchema=mongoose.Schema({
    userId:{
        type:mongoose.Schema.Types.ObjectId,
        ref:'UserModel'
    },
    item:[{
        product:{
            type:mongoose.Schema.Types.ObjectId,
            ref:'product',
            required:true
        },
        name:{
            type:String,
            required:true
        },
        quantity:{
            type:Number,
            default:1,
            required:true
        },
        price:{
            type:Number,
            required:true
        },
        total:{
            type:Number,
            required:true
        }
    }],
    grandTotalPrice:{
        type:Number,
        required : true
    }

})
const cartModel = mongoose.model('cart',cartSchema)
module.exports= cartModel