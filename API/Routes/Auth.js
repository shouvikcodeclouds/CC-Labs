require('dotenv').config

const express = require("express")
const router=express.Router()
const bodyParser = require('body-parser')
router.use(bodyParser.json({ type: 'application/json' }))
const jwt=require('jsonwebtoken')
const Vendor = require('../../model/Vendor')
const bcrypt = require("bcrypt")

router.post('/login', async (req,res)=>{
    try {
        const email=req.body.email;
        const password=req.body.password;
        const user = await Vendor.findOne({ email: email });
        console.log(user)
        if (!user) {
            return res.status(400).json({
                message:"User Does not exist"
            });
        }
        const validPassword = await bcrypt.compare(password, user.password);
        if (!validPassword) {
            return res.status(400).json({message:'Invalid Email or Password.'});
        }
        const token = jwt.sign({ id: user._id }, process.env.ACCESS_TOKEN);
        res.status(201).json({
            message:"Authentication Successful",
            token,
        });
    }
    catch(err){
        res.status(500).json({
            type: "error",
            message: "Something went wrong, please try again",
            error: err.message
        });
    }
})
module.exports=router;