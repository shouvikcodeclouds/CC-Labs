const express = require("express")
 const router=express.Router()
 const app = express()
 const bodyParser = require('body-parser')
 router.use(bodyParser.json({ type: 'application/json' }))
 const Category = require('../../model/Category')
 
 router.post('/categories', async (req, res)=>{
    const maxIdCategory = await Category.findOne({}, {}, { sort: { 'id': -1 } });
    let maxId = Number(maxIdCategory ? maxIdCategory.id : 0);
    const id=maxId+1;
    const newCategory=req.body.category;
    const newValue=new Category({id:id,name:newCategory})
    try{
        const savedValue=await newValue.save()
        
        res.status(201).json({
            type: "success",
            message: "Category added successfully",
            data: savedValue
        });

    }catch(err){
        res.status(500).json({
            type: "error",
            message: "Something went wrong please try again",
            error: err.message})
    }
 });
 router.get('/categories', async (req, res)=>{
    try {
        const categories = await Category.find();
        res.json(categories);
    } catch (err) {
        res.status(500).json({
            type: "error",
            message: "Something went wrong, please try again",
            error: err
        });
    }
 })
 router.get('/categories/:id', async (req, res) => {
    const categoryId = req.params.id;
    try {
        const category = await Category.findOne({ id: categoryId });
        if (!category) {
            return res.status(404).json({
                type: "error",
                message: "Category not found"
            });
        }
        res.json(category);
    } catch (err) {
        res.status(500).json({
            type: "error",
            message: "Something went wrong, please try again",
            error: err
        });
    }
});

 module.exports = router;

 