const express = require('express')
const fs = require('fs')
const passwordValidator = require('password-validator')
const dotenv = require('dotenv')
const nodeMailer = require('nodemailer')
const cors = require('cors')
const bcrypt = require('bcrypt')
const path = require('path')

dotenv.config()

const User = require('./modal/User')
const Maincategory = require('./modal/Maincategory')
const Subcategory = require('./modal/Subcategory')
const Order = require('./modal/Order')
const Contact = require('./modal/Contact')
require('./dbConnect')

const app = express()

app.use(cors());
app.use(express.json());

// react build connect


app.use(express.static(path.join(__dirname, 'build')));
app.use('/public', express.static('public'));

// password validation

var schema = new passwordValidator()
schema
    .is().min(8)                 // min length should be 8 
    .is().max(100)               // maximum charactor should be 100
    .has().uppercase(1)          // Atleast one uppercase character is required
    .has().lowercase(1)          // Atleast one lowercase character
    .has().not().oneOf(['Admin@123', 'Password@123', 'Password123', 'Admin123', 'User@123'])
console.log(schema.validate('Password123'))

// token genetor & verification

// async function verifyToken(req,res,next){
//     var token = req.headers.authorization
//     var user = await User.findOne({username:req.headers.username})
//     if(token && user){
//         if(user.role ==="User" && jwt.verify(token, process.env.USERSALTKEY)){
//             if(user.tokens.find((item)=> item == token))
//                 next()
//             else
//                 res.status(401).send({result:'Fail', message:'You logged out ! \n Please login again'})
//         }
//     }
// }

// Api for orders

app.post('/order', async (req, res) => {
    try {
        var data = new Order(req.body)
        await data.save()
        res.status(200).send({ result: 'Done', message: "New order created" })
    } catch (error) {
        if (error.keyValue)
            res.status(401).send({ result: "Fail", message: "Order number must be unique" })
        else if (error.errors.clientName)
            res.status(401).send({ result: "Fail", message: error.errors.clientName.message })
        else if (error.errors.maincategory)
            res.status(401).send({ result: 'Fail', message: error.errors.maincategory.message })
        else if (error.errors.subcategory)
            res.status(401).send({ result: 'Fail', message: error.errors.subcategory.message })
        else if (error.errors.dateOfPurchase)
            res.status(401).send({ result: 'Fail', message: error.errors.dateOfPurchase.message })
        else if (error.errors.expectedDeliveryDate)
            res.status(401).send({ result: 'Fail', message: error.errors.expectedDeliveryDate.message })
        else if (error.errors.productDeliveryDate)
            res.status(401).send({ result: 'Fail', message: error.errors.productDeliveryDate.message })
        else
            res.status(500).send({ result: 'Fail', message: "Internal server error" })
    }
})

app.get('/order', async (req, res) => {
    try {
        var data = await Order.find()
        res.send({ result: "Done", data: data })
    } catch (error) {
        res.status(500).send({ result: "Fail", message: 'Internal server error' })
    }
})
app.get('/order/:_id', async (req, res) => {
    try {
        var data = await Order.find({ _id: req.params._id })
        if (data)
            res.send({ result: "Done", data: data })
        else
            res.status(404).send({ result: "Fail", message: 'Invaid ID' })
    } catch (error) {
        res.status(500).send({ result: "Fail", message: 'Internal server error' })
    }
})
app.put('/order/:_id', async (req, res) => {
    try {
        var data = await Order.findOne({ _id: req.params._id })
        if (data) {
            data.clientName = req.body.clientName ?? data.clientName
            data.maincategory = req.body.maincategory ?? data.maincategory
            data.subcategory = req.body.subcategory ?? data.subcategory
            data.dateOfPurchase = req.body.dateOfPurchase ?? data.dateOfPurchase
            data.expectedDeliveryDate = req.body.expectedDeliveryDate ?? data.expectedDeliveryDate
            data.productDeliveryDate = req.body.productDeliveryDate ?? data.productDeliveryDate
            await data.save()
            res.status(200).send({ result: "Done", message: 'Record Updated' })
        }
        else
            res.status(404).send({ result: 'Fail', message: 'Invalid ID' })

    } catch (error) {
        if (error.errors.clientName)
            res.status(401).send({ result: 'Fail', message: error.errors.clientName.message })
        else if (error.errors.maincategory)
            res.status(401).send({ result: "Fail", message: error.errors.maincategory.message })
        else if (error.errors.subcategory)
            res.status(401).send({ result: "Fail", message: error.errors.subcategory.message })
        else if (error.errors.dateOfPurchase)
            res.status(401).send({result:'Fail', message: error.errors.dateOfPurchase.message})
        else if(error.errors.expectedDeliveryDate)
            res.status(401).send({result:'Fail', message: error.errors.expectedDeliveryDate.message})
        else if(error.errors.productDeliveryDate)
            res.status.send({result:"Fail", message: error.errors.productDeliveryDate.message})
        else
            res.status(500).send({result:'Fail', message:"Internal server error"})
    }
})
app.delete('/order/:_id', async(req,res)=>{
    try{
        var data = await Order.findOne({_id:req.params._id})
        if(data){
        console.log(data)
            await data.deleteOne()
            console.log(data)
            res.send({result:'Done', message:'Record deleted'})
        }else 
        res.status(404).send({result:'Fail', message:'Invalid ID'})
    }catch(error){
        res.status(500).send({result:'Fail', message:'Internal server error'})
    }
})

//API for maincategory
app.post('/maincategory', async (req, res) => {
    try {
        var data = new Maincategory(req.body)
        await data.save()
        res.send({ result: "Done", message: 'Maincategory Created' })
    }
    catch (error) {
        if (error.errors.name) {
            res.status(401).send({ result: 'Fail', message: "Maincategory Name Must be Uniue" })
        }
        else if (error.errors.name) {
            res.status(401).send({ result: "Fail", message: error.errors.name.message })
        }
        else {
            res.status(500).send({ result: 'Fail', message: "Internal Server Error" })
        }

    }
})
app.get('/maincategory', async (req, res) => {
    try {
        var data = await Maincategory.find()
        res.send({ result: 'Done', data: data })
    } catch (error) {
        res.status(500).send({ result: 'Fail', message: "Internal server error" })
    }
})

app.get('/maincategory/:_id', async (req, res) => {
    try {
        var data = await Maincategory.findOne({ _id: req.params._id })
        if (data)
            res.send({ result: "Done", data: data })
        else
            res.status(404).send({ result: 'Fail', message: "invaid ID" })
    } catch (error) {
        res.status(500).send({ result: 'Fail', message: 'Internal server error' })
    }
})
app.put("/maincategory/:_id", async (req, res) => {
    try {
        var data = await Maincategory.findOne({ _id: req.params._id })
        if (data) {
            data.name = req.body.name
            await data.save()
            res.send({ result: 'Done', message: 'Record is updated' })
        }
        else
            res.status(404).send({ result: 'Fail', message: 'Invallid ID' })
    } catch (error) {
        if (error.keyValue)
            res.status(401).send({ result: 'Fail', message: 'Maincategory must be unique.' })
        else if (error.errors.name)
            res.status(401).send({ result: 'Fail', message: error.errors.name.message })
        else
            res.status(500).send({ result: 'Fail', message: 'Internal server error' })
    }
})
app.delete('/maincategory/:_id', async (req, res) => {
    try {
        var data = await Maincategory.findOne({ _id: req.params._id })
        if (data) {
            await data.deleteOne()
            console.log(data)
            res.send({ result: 'Done', message: 'Record is deleted !' })
        }
        else
            res.status(404).send({ result: 'Fail', message: 'Invalid ID' })
    } catch (error) {
        res.status(500).send({ result: 'Fail', message: 'Internal server error' })
    }
})

// API for subcategory
app.post('/subcategory', async (req, res) => {
    try {
        var data = new Subcategory(req.body)
        await data.save()
        res.status(200).send({ result: "Done", message: "Subcategory created !" })
    } catch (error) {
        if (error.keyValue) {
            res.status(401).send({ result: "Fail", message: "Subcategory Must be unique" })
        }
        else if (error.errors.name)
            res.status(401).send({ result: 'Fail', message: error.errors.name.message })
        else
            res.status(500).send({ result: "fail", message: "Internal server error" })
    }
})
app.get('/subcategory', async (req, res) => {
    try {
        var data = await Subcategory.find()
        res.status(200).send({ result: "Done", data: data })
    } catch (error) {
        res.status(500).send({ result: "Fail", message: "Internal server error" })
    }
})
app.get('/subcategory/:_id', async (req, res) => {
    try {
        var data = await Subcategory.findOne({ _id: req.params._id })
        if (data)
            res.status(200).send({ result: 'Done', data: data })
        else
            res.status(404).send({ result: "Fail", message: "Invalid ID" })
    } catch (error) {
        res.status(500).send({ result: "Fail", message: "Internal server error" })
    }
})
app.put('/subcategory/:_id', async (req, res) => {
    try {
        var data = await Subcategory.findOne({ _id: req.params._id })
        if (data) {
            data.name = req.body.name
            await data.save()
            res.send({ result: 'Done', message: 'Record is updated' })
        }
        else
            res.status(404).send({ result: "Fail", message: "Invalid ID" })
    } catch (error) {
        if (error.keyValue)
            res.status(401).send({ result: "Fail", message: "Subcategory must be unique" })
        else if (error.errors.name) {
            res.status(401).send({ result: "Fail", message: error.errors.name.message })
        }
        else
            res.status(500).send({ result: "Fail", message: "Internal server error" })
    }
})
app.delete('/subcategory/:_id', async (req, res) => {
    try {
        var data = await Subcategory.findOne({ _id: req.params._id })
        if (data) {
            await data.deleteOne()
            res.send({ result: "Done", message: "Record Deleted" })
        }
        else
            res.status(404).send({ result: "Fail", message: "Invalid ID" })
    } catch (error) {
        res.status(500).send({ result: "Fail", message: "Internal Server error" })
    }
})

// API for contact

app.post('/contact', async(req,res)=>{
    try{
        var data = new Contact(req.body)
        await data.save()
        console.log(data)
        res.status(200).send({result:"Done", message:"Thanks for shaaring your query with us. Our team will contact you soon!"})

    }catch(error){
        if(error.errors.name)
            res.status(401).send({result:"Fail", message:error.errors.name.message})
        else if(error.errors.email)
            res.status(401).send({result:'Fail', message:error.errors.email.message})
        else if(error.errors.phone)
            res.status(401).send({result:'Fail', message:error.errors.email.message})
        else if(error.errors.subject)
            res.status(401).send({result:'Fail', message:error.errors.subject.message})
        else if(error.errors.message)
            res.status(401).send({result:'Fail', message:error.errors.message.message})
        else
            res.status(500).send({result:'Fail', message:'Internal server error'})
    }
})

app.get('/contact', async(req,res)=>{
   try{
    var data = await Contact.find()
    res.send({result:'Done', data:data})
   }catch(error){
    res.status(500).send({result:'Fail', message:'Internal server error'})
   }
})

app.get('/contact/:_id', async(req,res)=>{
    try{
        var data = await Contact.findOne({_id:req.params._id})
        if(data)
            res.send({result:'Done', data:data})
        else 
            res.status(404).send({result:'Fail',data:data})
    }catch(error){
        res.status(500).send({result:'Fail', message:'Internal server error'})
    }
})

app.put('/contact/:_id', async(req,res)=>{
    try{
        var data = await Contact.findOne({_id:req.params._id})
        if(data){
            data.status = req.body.status
            await data.save()
            res.send({result:'Done', message:'Record is updated'})
        }else{
            res.status(404).send({result:'Fail', message:'Invalid ID'})
        }
    }catch(error){
            if(error.keyValue)
                res.status(401).send({result:'Fail', message:'Contact must be unique'})
            else if(error.errros.name)
                res.status(401).send({result:'Fail',message:error.errors.name.message})
            else
                res.status(500).send({result:'Fail', message:'Internal server error'})
    }
})

app.delete('/contact/:_id', async(req,res)=>{
    try{
        var data = await Contact.findOne({_id:req.params._id})
        if(data){
            await data.deleteOne()
            res.status(200).send({result:'Done', message:'Record deleted'})
        }else 
            res.status(404).send({result:'Fail',message:'Invalid ID'})
    }catch(error){
        res.status(500).send({result:'Fail', message:'Internal server error'})
    }
})
// API for user

app.post('/user', async (req, res) => {
    try {
        var data = new User(req.body)
        if (schema.validate(req.body.password)) {
            bcrypt.hash(req.body.password, 12, async (error, hash) => {
                if (error)
                    res.status(500).send({ result: "fail", message: "Internal server error" })
                else {
                    data.password = hash
                    await data.save()
                    res.send({ result: "Done", message: "User Created" })
                }
            })
        }
        else
            res.status(401).send({ result: 'Fail', message: "Password must contain atleast 8 character, Atleast 1 uppercase alphabet and atleast 1 lowercase alphabet" })

    } catch (error) {
        if (error.keyValue)
            res.status(401).send({ result: "Fail", message: "Username must be Unique" })
        else if (error.errors.name)
            res.status(401).send({ result: "Fail", message: error.errors.name.message })
        else if (error.errors.email)
            res.status(401).send({ result: 'Fail', message: error.errors.email.message })
        else if (error.errors.phone)
            res.status(401).send({ result: "Fail", message: error.errors.phone.message })
        else if (error.errors.username)
            res.status(401).send({ result: "Fail", message: error.errors.username.message })
        else if (error.errors.password)
            res.status(401).send({ result: "Fail", message: error.errors.password.message })
        else
            res.status(500).send({ result: "Fail", message: "Internal server error" })
    }
})
app.get('/user', async (req, res) => {
    try {
        var data = await User.find()
        res.send({ result: "Done", data: data })
    } catch (error) {
        res.status(500).send({ result: "Fail", message: "Internal server error" })
    }
})
app.get('/user/:_id', async (req, res) => {
    try {
        var data = await User.findOne({ _id: req.params._id })
        if (data)
            res.send({ result: "Done", data: data })
        else
            res.status(404).send({ result: 'Fail', message: `User Doesn't Exists` })
    } catch (error) {
        res.status(500).send({ result: 'Fail', message: "Internal server error" })
    }
})
app.put('/user/:_id', async (req, res) => {
    try {
        var data = await User.findOne({ _id: req.params._id })
        if (data) {
            data.name = req.body.name ?? data.name
            data.email = req.body.email ?? data.email
            data.phone = req.body.phone ?? data.phone
            data.altphone = req.body.altphone ?? data.altphone
            data.address1 = req.body.address1 ?? data.address1
            data.address2 = req.body.address2 ?? data.address2
            data.address3 = req.body.address3 ?? data.address3
            data.pincode = req.body.pincode ?? data.pincode
            data.city = req.body.city ?? data.city
            data.state = req.body.state ?? data.state

            await data.save()
            res.send({ result: "Done", message: "Record is updated !" })
        }
    } catch (error) {
        if (error.keyValue)
            res.status(401).send({ result: "Fail", message: "Username must be unique" })
        else if (error.errors.name)
            res.status(401).send({ result: 'Fail', message: error.errors.name.message })
        else if (error.errors.email)
            res.status(401).send({ result: 'Fail', message: error.errors.email.message })
        else if (error.errors.phone)
            res.status(401).send({ result: "Fail", message: error.errors.phone.message })
        else if (error.errors.username)
            res.status(401).send({ result: "Fail", message: error.errors.username.message })
        else if (error.errors.password)
            res.status(401).send({ result: "Fail", message: error.errors.password.message })
        else
            res.status(500).send({ result: "Fail", message: "Internal server error" })
    }
})
app.delete('/user/:_id', async (req, res) => {
    try {
        var data = await User.findOne({ _id: req.params._id })
        if (data) {
            await data.deleteOne()
            console.log(data)
            res.status(200).send({ result: "Done", message: "Record deleted" })
        } else
            res.status(404).send({ result: 'fail', message: "Invalid ID" })
    } catch (error) {
        res.status(500).send({ result: "Fail", message: "Internal server error." })
    }
})

app.listen(8000, () => { console.log(`Server is running at Port ${8000}`) })