const express = require("express")
 const router=express.Router()
 const app = express()
 const bodyParser = require('body-parser')
 router.use(bodyParser.json({ type: 'application/json' }))
 const Vendor = require('../../model/Vendor')
 const bcrypt = require("bcrypt")
 const saltRounds = 10

 router.post('/vendor',async (req,res) => {
    const id=req.body.id;
    const username=req.body.username;
    const isActive=false;
    const email=req.body.email;
    const salt = await bcrypt.genSalt(saltRounds);
    const passwordHash = await bcrypt.hash(req.body.password, salt);
    const password=passwordHash;
    const newVendor=new Vendor({id,username,isActive, email, password})
    const savedValue = await newVendor.save();
    res.status(201).json({
        type: "success",
        message: "Vendor information added successfully",
        data: savedValue
    });
 })
 router.get('/vendor',async (req,res)=>{
    try {
        const vendors = await Vendor.find();
        res.status(201).json(vendors);
    } catch (err) {
        res.status(500).json({
            type: "error",
            message: "Something went wrong, please try again",
            error: err
        });
    }
 })

module.exports=router;