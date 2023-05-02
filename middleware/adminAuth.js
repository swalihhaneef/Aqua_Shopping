const multer = require('multer')
const path = require('path')
const isLogin=async(req,res,next)=>{
    try {
        
        if(req.session.admin_id){
            console.log('islogin');
            next();
        }
        else{
            res.redirect('/admin')
        }
       
    } catch (error) {
        console.log(error.message);
        
    }
}

const isLogout=async(req,res,next)=>{
    try {
        if(req.session.admin_id){
            res.redirect('/admin/home');
        }else{
            next();
        }
       
    } catch (error) {
        console.log(error.message);
        
    }
}
const storage = multer.diskStorage({
    destination:function(req,file,cb){
        cb(null,path.join(__dirname,'../public/product-image/temp'),function(err,success){
            if(err){
                throw error
            }
        })
    },
    filename:function(req,file,cb){
        const name =Date.now ()+'-'+ file.originalname
        cb(null,name,function(err,success){
            if(err){
                throw error
            }
        })
    }
})
const upload = multer({storage:storage})

module.exports={
    isLogin,
    isLogout,
    upload
}