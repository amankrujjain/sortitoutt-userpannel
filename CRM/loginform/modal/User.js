const mongoose = require('mongoose')

const UserSchema  = new mongoose.Schema({
    name:{
        type:String,
        required:[true,"Name Is Required"]
    },
    username:{
        type:String,
        unique:true,
        required:[true,"UserName Is Required and Must Be Unique"]
    },
    email:{
        type:String,
        required:[true,"Email Is Required"]
    },
    phone:{
        type:String,
        required:[true,'Phone Number Is Required']
    },
    altphone:{
        type:String,
        default:""
    },
    password:{
        type:String,
        required:[true,'Password Is Required']
    },
    address1:{
        type:String,
        default:""
    },
    address2:{
        type:String,
        default:""
    },
    address3:{
        type:String,
        default:""
    },
    pincode:{
        type:String,
        default:""
    },
    city:{
        type:String,
        default:""
    },
    state:{
        type:String,
        default:""
    },
    role:{
        type:String,
        default:'User'
    },
    otp:{
        type:String,
        default:""
    },
    token:[]
})
const User = new mongoose.model('User',UserSchema)
module.exports = User