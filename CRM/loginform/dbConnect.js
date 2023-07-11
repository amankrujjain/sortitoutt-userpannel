const mongoose = require('mongoose')

async function getConnect(){
    try{
        await mongoose.connect("mongodb://0.0.0.0:27017/sortitoutt")
        console.log('Database is connected')
    }
    catch(error){
        console.log(error)
    }
}
getConnect()