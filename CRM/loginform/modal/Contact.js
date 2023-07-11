const mongoose = require('mongoose')

const ContactSchema = new mongoose.Schema({
    name:{
        type:String,
        required:[true, 'Name is required']
    },
    email:{
        type:String,
        required:[true,'Email is required']
    },
    phone:{
        type:String,
        required:[true,"Phone Number is required"]
    },
    subject:{
        type:String,
        required:[true,'Subject is required']
    },
    message:{
        type:String,
        required:[true,'Message is required']
    },
    status:{
        type:String,
        default:'Active'
    },
    date:{
        type:String,
        default:""
    }
})
const Contact = new mongoose.model('Contact', ContactSchema)
module.exports = Contact