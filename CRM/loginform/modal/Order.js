const mongoose = require('mongoose')

const OrderSchema = new mongoose.Schema({
    orderNumber:{
        type:String,
        unique:true,
        required:[true, "Order number must require"]
    }
    ,clientName:{
        type:String,
        required:[true, "Name is required"]
    },
    maincategory:{
        type: String,
        required:[true, "Maincategory is required"]
    },
    subcategory:{
        type:String,
        required:[true, "Subcategory is required"]
    },
    dateOfPurchase:{
        type:String,
        required:[true, "Date of purchase is required"]
    },
    expectedDeliveryDate:{
        type:String,
        required:[true, "Expected date is required"]
    },
    productDeliveryDate:{
        type:String,
        required:[true, "Product delivery date is required"]
    }
})
const Order = new mongoose.model("Order", OrderSchema)
module.exports = Order