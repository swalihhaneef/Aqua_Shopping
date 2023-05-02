const express = require('express');
const user_route = express()
const bodyParser = require('body-parser')


const multer = require('multer')
const path = require('path')


user_route.use(express.static('public'))

const auth = require("../middleware/auth");
const ajaxauth = require('../middleware/ajaxAuth')

user_route.set('view engine', 'ejs');
user_route.set('views', './views/users');

user_route.use(bodyParser.json());
user_route.use(bodyParser.urlencoded({ extended: true }))

const userController = require("../controller/userController");
const cart_controller = require('../controller/cartController')


user_route.post('/sing-up', auth.isLogout, userController.insertUser)
user_route.get('/login', auth.isLogout, userController.loginLoad);
user_route.post('/login', userController.verifyLogin);
user_route.get('/login_with_otp', auth.isLogout, userController.otpLogin)
user_route.post('/otp_verification', userController.otp_page)
user_route.get('/resend-otp', userController.resendOtp)
user_route.post('/verify-otp', userController.verify_otp)
///////////////////////////////////////////////SHOPPING///////////////////////////////////
user_route.get('/', userController.homeLoad);
user_route.post('/productfilter', userController.productFilter)
user_route.get('/shop', userController.shopLoad)
user_route.get('/search', userController.searchProducts)
user_route.get('/lowTohigh', userController.lowTohigh)
user_route.get('/highTolow', userController.highTolow)
user_route.get('/men', userController.showMen)
user_route.get('/women', userController.showwomen)
user_route.get('/wallet', userController.showWallet)
user_route.get('/bags', userController.showBags)
user_route.get('/watch', userController.showWatch)
///////////product///////////////////////////////////////////////
user_route.get('/product-details', userController.loadProductDetails)
user_route.get('/men', userController.showMen)
user_route.get('/home', userController.homeLoad);
/////////////////////////////////////////////USER PROFILE/////////////////////////////////////
user_route.get('/user-profile', auth.isLogin, userController.userProfilLoad)
user_route.get('/address', userController.showAddress)
user_route.get('/addNewAddress', userController.addNewAddress)
user_route.get('/delete_address', userController.deleteAddress)
user_route.get('/edit_address', userController.editAddress)
user_route.post('/updateAddress', userController.updateAddress)
user_route.get('/userwallet', userController.showUserWallet)
user_route.get('/Myorders', userController.showOrders)
user_route.get('/order-details', userController.loadOrderDetails)
user_route.get('/cancel-order', userController.cancelOrder)
user_route.get('/logout', auth.isLogin, userController.userLogout)
////////////////////wishlist////////////////////////////////////
user_route.get('/wishList', auth.isLogin, userController.loadWishlist)
user_route.get('/addToWishlist', ajaxauth.isLogin, userController.addToWishlist)
user_route.get('/delete-wishlist', userController.removeWishlist)
/////////////////////cart management/////////////////////////////
user_route.get('/shopping-cart', auth.isLogin, cart_controller.cartLoad)
user_route.get('/addToCart', ajaxauth.isLogin, cart_controller.addToCart)
user_route.post('/increment', cart_controller.increment)
user_route.post('/decrement', cart_controller.decrement)
user_route.get('/delete-item', cart_controller.deleteCart)
/////////////////////////////CHECK OUT//////////////////////////
user_route.get('/checkout', userController.loadCheckout)
user_route.get('/addNewAddressCheckout', userController.addAddresscheckout)
user_route.post('/addAddressCheckout', userController.insertaddresscheckout)
user_route.get('/edit_addressCheckout', userController.editAddressCheckout)
user_route.post('/updateAddressCheckout', userController.updateAddressChekcout)
user_route.get('/delete_addressCheckout', userController.deleteAddresscheckout)
user_route.post('/addDetails', userController.addDeatails)
user_route.post('/redeem', userController.applyCoupon)
user_route.post('/payment', userController.payment)
user_route.get('/razorpay', userController.razorpay)
user_route.get('/order-confirm', userController.orderSuccess)


module.exports = user_route;
