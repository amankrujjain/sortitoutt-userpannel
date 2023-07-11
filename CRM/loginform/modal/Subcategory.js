const mongoose = require("mongoose")

const SubcategorySchema = new mongoose.Schema({
    name:{
        type:String,
        unique:true,
        required:[true,'subcategory name must required']
    }
})
const Subcategory = new mongoose.model('Subcategory',SubcategorySchema)
module.exports = Subcategory