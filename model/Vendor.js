const mongoose = require('mongoose')

const VendorData=mongoose.Schema({
    id:String,
    username:String,
    email:String,
    password:String,
    isActive:Boolean,
    category:String,
    description:String,
    price:Number
})

module.exports =mongoose.model('Vendor', VendorData);   
