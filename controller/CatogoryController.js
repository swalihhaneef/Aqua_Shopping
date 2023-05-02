const catogoryModel = require('../models/catogoryModel');
const productModel = require('../models/product');
let message

const categoryLoad=async(req,res)=>{
    try {

            const category=await catogoryModel.find()
            console.log(category);
            res.render("Catogory",{catogory:category,message})
            message =null
    } catch (error) {
        console.log(error);
    }
}
const addNewcategory = (req,res)=>{
  console.log(message);
    res.render('add_catogory',{message})
    message=null
   
}

const insertCatogory =async (req,res)=>{
 try {
    const repeat = await catogoryModel.findOne({name:req.body.name})
    console.log(repeat);
    if(repeat){
     message = 'This category is already exist please visit category page'
       res.redirect('/admin/add_catogory')
    }else{
        const Name = req.body.name
        const catogory =new catogoryModel({
    
            name:Name,
     })
        const catogoryData = catogory.save()
        res.redirect('/admin/category')
    }
    
   
 }
  catch (error) {
    console.log(error);
 }
    
}
const deletecategory = async (req,res)=>{
    try {
        const id = req.query.id 
        console.log(id);
       const product = await productModel.findOne({category:id})
       console.log("hhhhhh"+product+'heeyyyyy');
       if(product){
        message = 'cant delete the category because there are products in  this category'
        res.redirect('/admin/category')
       }else{
     
        await catogoryModel.deleteOne({_id:id})
      res.redirect('/admin/category')
       }
      
    }catch(error){
        console.log(error)
    }
    
}



module.exports = {
    categoryLoad,
    addNewcategory,
    insertCatogory,
    deletecategory


}