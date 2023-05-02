const express=require('express');
const admin_route=express();

const path = require('path')



const session=require('express-session');
const config=require("../config/config");



const bodyParser=require("body-parser"); 
admin_route.use(bodyParser.json());
admin_route.use(bodyParser.urlencoded({extended:true}));

admin_route.set('view engine','ejs');
admin_route.set('views','./views/admin')
admin_route.use(express.static('public'))




const auth=require("../middleware/adminAuth");
const adminAuth = require('../middleware/adminAuth')
const catogoryController = require('../controller/CatogoryController')
const productController = require('../controller/productController')
const adminController=require("../controller/adminController");
const { error } = require('console');
const user_route = require('./userRoute');


////////////////////admin routes///////////////////
admin_route.get('/',adminAuth.isLogout ,adminController.loadLogin);
admin_route.post('/login',adminController.verifyLogin);
admin_route.get('/dashboard',adminAuth.isLogin, adminController.loadDashboard);
admin_route.post('/sales-report',adminAuth.isLogin,adminController.showSalesReport)
admin_route.get('/users',adminAuth.isLogin,adminController.loadhome)
admin_route.get('/block_user',adminAuth.isLogin,adminController.block_user)
admin_route.get('/unblock_user',adminAuth.isLogin,adminController.unblock_user)

/////////////CATEGORY MANAGEMENT/////////////////////////////////
admin_route.get('/category',adminAuth.isLogin,catogoryController.categoryLoad)
admin_route.get('/add_catogory',adminAuth.isLogin,catogoryController.addNewcategory)
admin_route.post('/add_catogory',adminAuth.isLogin,catogoryController.insertCatogory)
admin_route.get('/delete_category',adminAuth.isLogin,catogoryController.deletecategory)

///////////////PRODUCT MANAGEMENT//////////////////////////////////
admin_route.get('/products',adminAuth.isLogin,productController.productLoad)
admin_route.get('/add_products',adminAuth.isLogin,productController.addProducts)
admin_route.post('/add_products',adminAuth.upload.array('image'),adminAuth.isLogin,productController.insertProduct)
admin_route.get('/edit_product',productController.edit_product)
admin_route.get('/delete_image',productController.deleteImage)
admin_route.post('/update_products',adminAuth.isLogin,adminAuth.upload.array('image'),productController.update_product)
admin_route.get('/delete_product',adminAuth.isLogin,productController.deleteProduct)
admin_route.get('/flag_product',adminAuth.isLogin,productController.flagProduct)
////////////////////////order management///////////////////////////////////////
admin_route.get('/orders',adminAuth.isLogin,adminController.listOrders)
admin_route.get('/order-details',adminAuth.isLogin,adminController.orderDetails)
admin_route.get("/approve_order",adminAuth.isLogin,adminController.approveOrder)
admin_route.get('/cancel_order',adminAuth.isLogin,adminController.cancelOrder)
admin_route.get('/approve_return',adminAuth.isLogin,adminController.approverefund)

///////////////////////////////////bannner management///////////////////////
admin_route.get('/banners',adminAuth.isLogin,adminController.banners)
admin_route.get('/add_banner',adminAuth.isLogin,adminController.addBanner)
admin_route.post('/add_banner',adminAuth.isLogin,adminAuth.upload.array('image'),adminController.insertBanner)
admin_route.get('/edit_banner',adminAuth.isLogin,adminController.editBanner)
admin_route.post('/update_banner',adminAuth.isLogin,adminAuth.upload.array('image'),adminController.updateBanner)
admin_route.get('/delete_banner',adminAuth.isLogin,adminController.deleteBanner)
//////////////////////////////////////////coupon///////////////////////////
admin_route.get('/coupons',adminAuth.isLogin,adminController.loadCoupons)
admin_route.get('/createCoupons',adminAuth.isLogin,adminController.addCoupons)
admin_route.post('/addCoupons',adminAuth.isLogin,adminController.insertCoupon)
admin_route.get('/deletCoupon',adminAuth.isLogin,adminController.deletcoupon)
admin_route.get('/logout',adminAuth.isLogin,adminController.logout);
admin_route.get('/logout',adminAuth.isLogin,adminController.logout)







module.exports=admin_route;