const mongoose=require('mongoose');

const UserSchema=new mongoose.Schema({
    name:{
        type: String,
        required: true
    },
    email:{
        type: String,
        required: true
    },
    password:{
        type: String,
        required: true
    },
    mobile:{
        type: Number,
        required: true
    },
    coupons_applied:{
        type:mongoose.Schema.Types.ObjectId,
        ref:'coupon',  
    },
    address:[{
        first_name:{
            type:String,
            required:true
        },
        last_name:{
            type:String,
            required:true
        },
        house:{
            type:String,
            required:true
        },
        land_mark:{
            type:String,
            required:true
        },
        town:{
            type:String,
            required:true
        },
        state:{
            type:String,
            required:true
        },
        pin_code:{
            type:Number,
            required:true
        },
        phone:{
            type:Number,
            required:true
        },
        email:{
            type:String,
            required:true
        }
    }],
    wishlist:[{
        product:{
            type:mongoose.Schema.Types.ObjectId,
            ref:'product',
            required:true
        },name:{
            type:String,
            required:true
        },price:{
            type:Number,
            required:true
        }
    }],
    is_admin:{
        type:Number,
        require:true
    },
    is_blocked:{
        type:Number,
        default:0
    },
    is_verified:{
        type:Number,
        default:0
    },wallet:{
        type:Number,
        default:0,
        require:true
    },
    profile_pic:{
        type:'array',
        require:true
    }
})
    


const UserModel=mongoose.model('UserModel',UserSchema)

module.exports=UserModel