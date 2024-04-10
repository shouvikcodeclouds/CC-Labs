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
        res.status(200).json({
            data:vendors,  
            headers: req.headers
        });
    } catch (err) {
        res.status(500).json({
            type: "error",
            message: "Something went wrong, please try again",
            error: err
        });
    }
 })
 router.patch('/vendor/:id',async (req,res)=>{
    const id=req.params.id;
    const username=req.body.username;
    const email=req.body.email;
    const isActive=req.body.isActive;
    const category=req.body.category;
    const description=req.body.description;
    const price=req.body.price;
    try {
        const update = await Vendor.findOneAndUpdate({ id: { $eq: id } }, { $set:{ username, email, isActive, category, description, price }}, { new: true });
        const vendors = await Vendor.findOne({ id: { $eq: id }});
        if (!update) {
            return res.status(404).json({
                type: "error",
                message: "Vendor not found"
            });
        }
        res.status(200).json({
            type: "success",
            message: "Vendor information updated successfully",
            data: vendors
        });
    }catch(err){
        res.status(500).json({
            type: "error",
            message: "Something went wrong, please try again",
            error: err.message
        });

    }

 });
 router.delete('/vendor/:id',async (req, res) => {
    const id=req.params.id;
    try {
        const deletedVendor = await Vendor.findOneAndDelete({ id: { $eq: id } });
        if (!deletedVendor) {
            return res.status(404).json({
                type: "error",
                message: "Vendor not found"
            });
        }
        res.status(200).json({
            type: "success",
            message: "Vendor deleted successfully",
            data: deletedVendor
        });
    } catch (err) {
        res.status(500).json({
            type: "error",
            message: "Something went wrong, please try again",
            error: err.message
        });
    }
 });

module.exports=router;