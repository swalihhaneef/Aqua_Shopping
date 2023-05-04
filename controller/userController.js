const UserSchema = require('../models/userModel')
const bcrypt = require('bcrypt')
const orderSchema = require('../models/order')
const couponModel = require('../models/coupon')
const auth = require('../middleware/auth')
const salesReport = require('../models/salerReport')
const nodemailer = require('nodemailer')
//const UserModel = require('../models/userModel')
const productController = require('../models/product')
const bannerModel = require('../models/banner')
const cartModel = require('../models/cart')
const productModel = require('../models/product')
const catogoryModel = require('../models/catogoryModel')
let useremail
let message

let accountSid = "AC3204ba435a95dde611dc6fd529ad9a21";
let authToken = " 05276946572a2e0b52a621ccf67a7beb";
let verifySid = "VA23e76a20775236264c98ba201134f538"
const client = require('twilio')(accountSid, authToken);

const Razorpay = require('razorpay');
var instance = new Razorpay({ key_id: 'rzp_test_J7k1zlWydyK2ii', key_secret: '3Pimk0nxXlS4EOnh7S2xLMdU' })

const securePassword = async (password) => {
    try {
        const passwordHash = await bcrypt.hash(password, 10);
        return passwordHash;

    } catch (error) {
        console.log(error.message);

    }
}

const homeLoad = async (req, res) => {
    try {
        const productData = await productController.find()
        const banner = await bannerModel.find()
        res.render('home', { banner })

    } catch (error) {
        console.log(error.message);

    }
}
const shopLoad = async (req, res) => {
    try {
        let currentPage = 1
        if (req.query.currentpage) {
            currentPage = req.query.currentpage
        }
        const limit = 8
        offset = (currentPage - 1) * limit
        const category = await catogoryModel.find()

        const product = await productController.find({})
        const productData = await productController.find().skip(offset).limit(limit)
        const totalproducts = product.length
        const totalPage = Math.ceil(totalproducts / limit)
        console.log(totalproducts);
        res.render('shop', { product: productData, currentPage, totalPage, category })
    } catch (error) {
        console.log(error);
    }
}
const productFilter = async (req, res) => {
    try {

        const category = req.body.category
        const sort = req.body.sort
        const search = req.body.search
        const gender = req.body.gender
        console.log(req.body);
        let products;

        if (!category && !sort && !search) {
            products = await productModel.find({}).populate('category')

        }
        else if (category && sort && search) {
            if (category === 'all') {
                if (sort === 'highToLow') {
                    products = await productModel.find(
                        {
                            name: { $regex: '\\b' + search.replace(/\s+/g, '\\s+') + '\\b', $options: 'i' }
                        }).sort({ price: -1 }).populate('category')

                } else if (sort === 'lowToHigh') {
                    products = await productModel.find(
                        {
                            name: { $regex: '\\b' + search.replace(/\s+/g, '\\s+') + '\\b', $options: 'i' }
                            ,
                        }).sort({ price: 1 }).populate('category').limit(4)
                } else if (sort === 'all') {
                    products = await productModel.find(
                        {
                            name: { $regex: '\\b' + search.replace(/\s+/g, '\\s+') + '\\b', $options: 'i' }
                        }).populate('category').limit(4)
                } else {
                    products = await productModel.find(
                        {
                            name: { $regex: '\\b' + search.replace(/\s+/g, '\\s+') + '\\b', $options: 'i' }
                        }).populate('category').limit(4)
                }
            } else {
                if (sort === 'highToLow') {
                    products = await productModel.find(
                        {
                            name: { $regex: '\\b' + search.replace(/\s+/g, '\\s+') + '\\b', $options: 'i' }
                            , category: category
                        }).sort({ price: -1 }).populate('category').limit(4)

                } else if (sort === 'lowToHigh') {
                    products = await productModel.find(
                        {
                            name: { $regex: '\\b' + search.replace(/\s+/g, '\\s+') + '\\b', $options: 'i' }
                            , category: category
                        }).sort({ price: 1 }).populate('category').limit(4)
                } else if (sort === 'all') {
                    products = await productModel.find(
                        {
                            name: { $regex: '\\b' + search.replace(/\s+/g, '\\s+') + '\\b', $options: 'i' }
                            , category: category
                        }).populate('category').limit(4)
                } else {
                    products = await productModel.find(
                        {
                            name: { $regex: '\\b' + search.replace(/\s+/g, '\\s+') + '\\b', $options: 'i' }
                            , category: category
                        }).populate('category').limit(4)
                }
            }
        }
        else if (!category && !sort && search) {

            products = await productModel.find({
                name: { $regex: '\\b' + search.replace(/\s+/g, '\\s+') + '\\b', $options: 'i' }
            }).populate('category').limit(4)

        }
        else if (!category && sort && !search) {

            if (sort === 'highToLow') {
                products = await productModel.find(
                    {}).sort({ price: -1 }).populate('category').limit(4)

            } else if (sort === 'lowToHigh') {
                products = await productModel.find(
                    {}).sort({ price: 1 }).populate('category').limit(4)

            } else if (sort === 'all') {
                products = await productModel.find(
                    {}).populate('category').limit(4)
            } else {
                products = await productModel.find(
                    {}).populate('category').limit(4)
            }
        }
        else if (category && !sort && !search) {
            if (category === 'all') {
                products = await productModel.find(
                    {}).populate('category').limit(4)
            } else {
                products = await productModel.find(
                    { category: category }).populate('category').limit(4)
            }
        }
        else if (category && sort && !search) {
            if (category != 'all') {
                if (sort === 'highToLow') {
                    products = await productModel.find(
                        { category: category }).sort({ price: -1 }).populate('category').limit(4)

                } else if (sort === 'lowToHigh') {
                    products = await productModel.find(
                        { category: category, }).sort({ price: 1 }).populate('category').limit(4)

                } else if (sort === 'all') {
                    products = await productModel.find(
                        { category: category }).populate('category').limit(4)
                } else {
                    products = await productModel.find(
                        { category: category }).populate('category').limit(4)
                }
            } else {
                if (sort === 'highToLow') {
                    products = await productModel.find(
                        {}).sort({ price: -1 }).populate('category').limit(4)

                } else if (sort === 'lowToHigh') {
                    products = await productModel.find(
                        {}).sort({ price: 1 }).populate('category').limit(4)

                } else if (sort === 'all') {
                    products = await productModel.find(
                        {}).populate('category').limit(4)
                } else {
                    products = await productModel.find(
                        {}).populate('category').limit(4)
                }
            }
        }
        else if (!category && sort && search) {

            if (sort === 'highToLow') {
                products = await productModel.find(
                    {
                        name: { $regex: '\\b' + search.replace(/\s+/g, '\\s+') + '\\b', $options: 'i' }
                    }).sort({ price: -1 }).populate('category').limit(4)

            } else if (sort === 'lowToHigh') {
                products = await productModel.find(
                    {
                        name: { $regex: '\\b' + search.replace(/\s+/g, '\\s+') + '\\b', $options: 'i' }
                    }).sort({ price: 1 }).populate('category').limit(4)

            } else if (sort === 'all') {
                products = await productModel.find(
                    {
                        name: { $regex: '\\b' + search.replace(/\s+/g, '\\s+') + '\\b', $options: 'i' }
                    }).populate('category').limit(4)
            } else {
                products = await productModel.find(
                    {
                        name: { $regex: '\\b' + search.replace(/\s+/g, '\\s+') + '\\b', $options: 'i' }
                    }).populate('category').limit(4)
            }

        } else if (category && !sort && search) {
            if (category === 'all') {
                products = await productModel.find(
                    {
                        name: { $regex: '\\b' + search.replace(/\s+/g, '\\s+') + '\\b', $options: 'i' }
                    }).populate('category').limit(4)
            } else {
                products = await productModel.find(
                    {
                        name: { $regex: '\\b' + search.replace(/\s+/g, '\\s+') + '\\b', $options: 'i' }
                        , category: category
                    }).populate('category').limit(4)
            }
        }
        console.log(req.body, products);

        res.send({ success: true, products })

    } catch (err) {
        console.log(err.log);
    }
}
const loginLoad = async (req, res) => {
    try {
        // Get the current URL


        res.render('login')

    } catch (error) {
        console.log(error.message);

    }
}
const loadProductDetails = async (req, res) => {
    try {
        const session = req.session.user_id
        const productid = req.query.id
        mes = null
        const productData = await productController.findById({ _id: productid }).populate('category')
        res.render('product-details', { product: productData, session, mes })
    } catch (error) {
        console.log(error);
    }
}
const userProfilLoad = async (req, res) => {
    try {
        const session = req.session.user_id
        const user = await UserSchema.findOne({ _id: session })
        if (user) {

            res.render('userProfile', { users: user })
        } else {
            res.redirect('/signup')
        }
    } catch (error) {
        console.log(error);
    }
}
const showAddress = async (req, res) => {
    try {
        const session = req.session.user_id
        const user = await UserSchema.findOne({ _id: session })
        res.render('address', { users: user })
    } catch (error) {
        console.log(error);
    }
}
const addNewAddress = async (req, res) => {
    res.render('addNewaddress')
}
const editAddress = async (req, res) => {
    try {
        const session = req.session.user_id
        const id = req.query.id
        const user = await UserSchema.findOne({ _id: session, 'address._id': id })
        res.render('edit-address', { users: user })
    } catch (error) {
        console.log(error);
    }
}
const updateAddress = async (req, res) => {
    try {
        const id = req.query.id
        const session = req.session.user_id
        const user = await UserSchema.updateOne({ _id: session }, {
            $set: {
                address: {
                    first_name: req.body.firstName,
                    last_name: req.body.lastName,
                    house: req.body.house,
                    land_mark: req.body.landMark,
                    town: req.body.town,
                    state: req.body.state,
                    pin_code: req.body.pinCode,
                    phone: req.body.phone,
                    email: req.body.email
                }
            }
        })
        res.redirect('/address')
    } catch (error) {
        console.log(error);
    }
}
const
    deleteAddress = async (req, res) => {
        try {
            const id = req.query.id
            const session = req.session.user_id
            const userdata = await UserSchema.updateOne({ _id: session }, { $pull: { address: { _id: id } } })

            console.log(userdata);
            res.redirect('/address')
        } catch (error) {
            console.log(error);
        }
    }
const showUserWallet = async (req, res) => {
    try {
        const session = req.session.user_id
        const user = await UserSchema.findOne({ _id: session })
        const order = await orderSchema.find({ user: session, 'order.payment_type': 'wallet' })
        const refund = await orderSchema.find({ user: session, 'order.status': 'refund approved' })
        console.log(order);
        console.log(refund);


        if (order) {
            res.render('wallet', { user, order, refund })
        } else {
            message = 'you never done any transaction using wallet'
            res.render('wallet', { user, message })
        }

    } catch (error) {
        console.log(error);
    }
}
const showOrders = async (req, res) => {
    try {
        const session = req.session.user_id
        const order = await orderSchema.find({ user: session })
        .sort({ 'order.date': -1 })
        .populate('order.product')
        .populate('address');
        console.log(order);
              let currentPage = 1
        if (req.query.currentpage) {
            currentPage = req.query.currentpage
        }
        const limit = 2
        offset = (currentPage - 1) * limit
         
        const orderData = await orderSchema.find({ user: session }).sort({ _id: -1 }).populate('order.product').populate('address').skip(offset).limit(limit)
        const totalorders = order.length
        const totalPage = Math.ceil(totalorders / limit)
        console.log(totalorders);
        mes = null
        res.render('orders', { orders: orderData, mes, currentPage, totalPage })

    } catch (error) {
        console.log(error);
    }
}
const loadOrderDetails = async (req, res) => {
    try {
        const session = req.session.user_id
        const id = req.query.id
        const orderData = await orderSchema.findOne({ _id: id }).populate('order.product')
        console.log(orderData);
        res.render('orderDetail', { orderData: orderData })
    } catch (error) {
        console.log(error);
    }
}
const cancelOrder = async (req, res) => {
    try {
        console.log('kkkkk');
        const id = req.query.id
        const orderData = await orderSchema.findOne({ _id: id })
        const ids = orderData.order.map((value => {
            return value._id
        }))
        ids.forEach(async (element) => {
            await orderSchema.updateOne({ _id: id, 'order._id': element }, { $set: { 'order.$.status': 'return pending' } })
        });
        await salesReport.deleteOne({ orders: id })
        res.redirect('/Myorders')
    } catch (error) {
        console.log(error);
    }
}
const searchProducts = async (req, res) => {
    try {
        let currentPage = 1
        if (req.query.currentpage) {
            currentPage = req.query.currentpage
        }
        let search = req.query.search
        const limit = 4
        offset = (currentPage - 1) * limit
        const product = await productController.find({}, {
            $or: [
                { name: { $regex: '.*' + search + '.*' } },
                { category: { $regex: '.*' + search + '.*' } }]
        })
        console.log(product);
        const productData = await productController.find().skip(offset).limit(limit)
        const totalproducts = product.length
        const totalPage = Math.ceil(totalproducts / limit)
        console.log(totalproducts);
        res.json({ success: true, product: productData, currentPage, totalPage })
    } catch (error) {
        console.log(error);
    }
}
const lowTohigh = async (req, res) => {
    try {
        let currentPage = 1
        if (req.query.currentpage) {
            currentPage = req.query.currentpage
        }
        let search = req.query.search
        const limit = 4
        offset = (currentPage - 1) * limit
        const product = await productController.find().sort({ price: 1 })
        console.log(product);
        if (product) {
            console.log('yesss');
        }
        const productData = await productController.find().sort({ price: 1 }).skip(offset).limit(limit)
        const totalproducts = product.length
        const totalPage = Math.ceil(totalproducts / limit)
        console.log(totalproducts);
        res.render('shop', { product: productData, currentPage, totalPage })
    } catch (error) {
        console.log(error);
    }
}
const highTolow = async (req, res) => {
    try {
        let currentPage = 1
        if (req.query.currentpage) {
            currentPage = req.query.currentpage
        }
        let search = req.query.search
        const limit = 4
        offset = (currentPage - 1) * limit
        const product = await productController.find().sort({ price: -1 })
        console.log(product);
        if (product) {
            console.log('yesss');
        }
        const productData = await productController.find().sort({ price: -1 }).skip(offset).limit(limit)
        const totalproducts = product.length
        const totalPage = Math.ceil(totalproducts / limit)
        console.log(totalproducts);
        res.render('shop', { product: productData, currentPage, totalPage })
    } catch (error) {
        console.log(error);
    }
}
const showMen = async (req, res) => {
    try {

        const productData = await productController.find({ gender: 'male' })

        if (productData) {
            let currentPage = 1
            if (req.query.currentpage) {
                currentPage = req.query.currentpage
            }
            const limit = 4
            offset = (currentPage - 1) * limit
            const product = await productController.find({ gender: 'male' }).skip(offset).limit(limit)
            const category = await catogoryModel.find()
            const totalproducts = productData.length
            const totalPage = Math.ceil(totalproducts / limit)
            console.log(totalproducts);
            res.render('shop', { product: product, currentPage, totalPage, category })
        }
    } catch (error) {
        console.log(error);
    }
}
const showwomen = async (req, res) => {
    try {
        const productData = await productController.find({ gender: 'female' })
        if (productData) {
            let currentPage = 1
            if (req.query.currentpage) {
                currentPage = req.query.currentpage
            }
            const category = await catogoryModel.find()
            const limit = 4
            offset = (currentPage - 1) * limit
            const product = await productController.find({ gender: 'female' }).skip(offset).limit(limit)
            const totalproducts = productData.length
            const totalPage = Math.ceil(totalproducts / limit)
            console.log(totalproducts);
            res.render('shop', { product: product, currentPage, totalPage, category })
        }
    } catch (error) {
        console.log(error);
    }
}
const showWallet = async (req, res) => {
    try {
        const category = await catogoryModel.findOne({ name: 'WALLET' })

        const productData = await productController.find({ category: category._id })

        if (productData) {
            let currentPage = 1
            if (req.query.currentpage) {
                currentPage = req.query.currentpage
            }
            const limit = 4
            offset = (currentPage - 1) * limit
            const product = await productController.find({ category: category._id }).skip(offset).limit(limit)
            const totalproducts = productData.length
            const totalPage = Math.ceil(totalproducts / limit)
            console.log(totalproducts);
            res.render('shop', { product: product, currentPage, totalPage, category })
        }
    } catch (error) {
        console.log(error);
    }
}
const showBags = async (req, res) => {
    try {
        const category = await catogoryModel.findOne({ name: 'BAGS' })

        const productData = await productController.find({ category: category._id })
        if (productData) {
            let currentPage = 1
            if (req.query.currentpage) {
                currentPage = req.query.currentpage
            }
            const limit = 4
            offset = (currentPage - 1) * limit
            const product = await productController.find({ category: category._id }).skip(offset).limit(limit)
            const totalproducts = productData.length
            const totalPage = Math.ceil(totalproducts / limit)
            console.log(totalproducts);
            res.render('shop', { product: product, currentPage, totalPage, category })
        }
    } catch (error) {
        console.log(error);
    }
}
const showWatch = async (req, res) => {
    try {
        const category = await catogoryModel.findOne({ name: 'WATCH' })

        const productData = await productController.find({ category: category._id })
        if (productData) {
            let currentPage = 1
            if (req.query.currentpage) {
                currentPage = req.query.currentpage
            }
            const limit = 4
            offset = (currentPage - 1) * limit
            const product = await productController.find({ category: category._id }).skip(offset).limit(limit)
            const totalproducts = productData.length
            const totalPage = Math.ceil(totalproducts / limit)
            console.log(totalproducts);
            res.render('shop', { product: product, currentPage, totalPage, category })
        }
    } catch (error) {
        console.log(error);
    }
}
const loadRegister = async (req, res) => {
    try {
        res.render('sign', { message });
        message = null
    } catch (error) {
        console.log(error.message);
    }
}
const insertUser = async (req, res) => {
    try {

        const repeat = await UserSchema.findOne({ email: req.body.email })
        if
            (req.body.name == "" && req.body.email == "" && req.body.password == "" && req.body.repassword == "") {
            message = "please fill Registration details"
            res.redirect('/signup')
        } else if (req.body.email == "") {
            user
            message = "email is empty"
            res.redirect('/signup')
        } else if (repeat) {
            message = "email already exist"
            res.redirect('/signup')
        } else if (req.body.name == "") {
            message = "Please enter name"
            res.redirect('/signup')
        } else if (req.body.password == "") {
            message = "Please enter password"
            res.redirect('/signup')
        } else if (req.body.password.length < 8) {
            message = "password must contain 8 character"
            res.redirect('/signup')
        } else if (req.body.mobile == "") {
            message = "Please fill your mobile number"
            res.redirect('/signup')
        } else if (req.body.mobile < 10) {
            message = "enter the correct mobile number"
            res.redirect('/signup')
        }

        else {

            console.log(req.body.name);
            const spassword = await securePassword(req.body.password);
            const user = new UserSchema({
                name: req.body.name,
                email: req.body.email,
                password: spassword,
                mobile: req.body.mobile,
                is_admin: 0
            });
            const userData = await user.save();
            if (userData) {

                res.render('login', { message: "sign up success" })
            } else {
                res.render('sign', { message: "sign up Failed" })

            }
        }
    } catch (error) {
        console.log(error.message);

    }
}


const verifyLogin = async (req, res) => {

    try {

        emaillogin = req.body.email
        passwordlogin = req.body.password

        const loginData = await UserSchema.findOne({ email: emaillogin })
        const productData = await productController.find()
        if (loginData) {
            const passwordmatch = await bcrypt.compare(passwordlogin, loginData.password)
            if (passwordmatch) {

                req.session.user_id = loginData._id
                useremail = loginData.name

                if (req.session.url) {
                    res.redirect(req.session.url);
                    console.log('in here');


                } else {
                    console.log('ooops');
                    const banner = await bannerModel.find()
                    res.render('home', { banner, product: productData })
                }
            } else {
                console.log("password match failed")
                res.render('login', { message: "incorrect password" })
                console.log("hai incorrect password");
            }
        } else {
            res.render('login', { message: "incorrect mail" })
        }


    } catch (error) {
        console.log(error.message);
    }
}
///////////////////////////otpppppp\\\\\\\\\\\\\\\\\\\\\\\\\\\\\

const otpLogin = async (req, res) => {
    try {

        console.log('entered on otp section',);
        res.render('userOtp')
    } catch (error) {
        console.log(error);
    }
}
let mes

const otp_page = async (req, res) => {
    try {

        console.log('entered on otp page');
        const mobileNum = req.body.mobile;
        const findMobile = await UserSchema.findOne({ mobile: mobileNum })
        if (!findMobile) {
            mobileNum = req.session.mobile
            console.log(req.session.mobile);
            message = "Cant find your account"
            res.redirect('/userOtp')
        } else {
            req.session.mobile = mobileNum
            mes = "Otp send to your number"
            const verification = await client.verify.v2
                .services(verifySid)
                .verifications.create({
                    to: `+91${mobileNum}`, channel: "sms"
                })
            res.render('otp-page', { mes })
        }

    } catch (error) {
        console.log(error);
    }
}

const verify_otp = async (req, res) => {
    console.log('verify otp worked')
    const otp = req.body.code
    const phone = req.session.mobile



    console.log('otp:', otp);
    console.log('phone:', phone);
    try {
        if (!otp) {
            throw new Error('OTP is missing')
        }
        const verification_check = await client.verify.v2.services(verifySid)
            .verificationChecks.create({ to: `+91${phone}`, code: otp })
            .then(async (verification_check) => {

                if (verification_check.status == "approved") {

                    req.session.otpcorrect = true

                    const find = await UserSchema.findOne({ mobile: phone })
                    console.log(find);
                    req.session.user_id = find._id

                    res.redirect('/')
                } else if (verification_check.status != "approved") {
                    res.render("otp-page", { mes: "invalid otp" })
                } else {

                }
            })
    } catch (error) {
        console.log(error);
    }
}


const resendOtp = async (req, res) => {
    const phone = req.session.mobile
    try {
        res.render("otp-page", { mes: "otp resend to your number" })
        const verification = await client.verify.v2
            .services(verifySid)
            .verifications.create({ to: `+91${phone}`, channel: "sms" })
            .then(async (verification_check) => {

                if (verification_check.status == "approved") {

                    req.session.otpcorrect = true

                    const find = await UserSchema.findOne({ mobile: phone })
                    console.log(find);
                    req.session.user_id = find._id

                    res.redirect('/')
                } else {
                    res.render("otp-page", { mes: "invalid otp" })

                }
            })
    } catch (error) {
        console.log(error);
    }
}
///////////////////////WISHLIST//////////////////
const loadWishlist = async (req, res) => {
    try {
        const session = req.session.user_id
        const userData = await UserSchema.findOne({ _id: session }).populate('wishlist.product')
        let mes = null
        res.render('wishlist', { user: userData, mes })
    } catch (error) {
        console.log(error);
    }
}
const addToWishlist = async (req, res) => {
    try {
        console.log(req.query);
        const session = req.session.user_id
        const id = req.query.id
        const productData = await productController.findOne({ _id: id })
        const user = await UserSchema.findOne({ _id: session, 'wishlist.product': id })
        if (user) {
            message = 'this product is already exist'
            res.send({ error: true, message })
        } else {
            const updated = await UserSchema.updateOne({ _id: session }, { $push: { wishlist: { product: productData._id, name: productData.name, price: productData.price } } })
            console.log(updated);
            message = 'this product is added to  your wishlist'
            res.send({ success: true, message })
        }
    } catch (error) {
        console.log(error);
    }
}
const removeWishlist = async (req, res) => {
    try {
        const id = req.query.id
        const session = req.session.user_id
        console.log(id)
        const x = await UserSchema.updateOne({ _id: session }, { $pull: { wishlist: { product: id } } });

        res.redirect('/wishlist')
    } catch (error) {
        console.log(error);
    }
}
//////////////////////////check out////////////////
const loadCheckout = async (req, res) => {
    try {

        const session = req.session.user_id
        const cartdata = await cartModel.findOne({ userId: session })
        const user = await UserSchema.findOne({ _id: session })
        const coupons = await couponModel.find()
        if (session) {
            if (cartdata) {

                const cart = await cartModel.findOne({ userId: session }).populate('item.product')
                message = null
                res.render('check-out', { cart, user, coupons, message })

            }

        } else {
            res.redirect('/login')
        }
    } catch (error) {
        console.log(error);
    }
}
const addAddresscheckout = async (req, res) => {
    try {
        res.render('addAddresscheckout')
    } catch (error) {
        console.log(error);
    }
}
const insertaddresscheckout = async (req, res) => {
    try {
        const session = req.session.user_id
        const user = await UserSchema.findById({ _id: session })

        if (user) {
            const updated = await UserSchema.updateOne({ _id: session }, {
                $push: {
                    address: {
                        first_name: req.body.firstName,
                        last_name: req.body.lastName,
                        house: req.body.house,
                        land_mark: req.body.landMark,
                        town: req.body.town,
                        state: req.body.state,
                        pin_code: req.body.pinCode,
                        phone: req.body.phone,
                        email: req.body.email
                    }
                }
            })

            res.redirect('/checkout')
        }
    } catch (error) {
        console.log(error);
    }
}
const editAddressCheckout = async (req, res) => {
    try {
        const session = req.session.user_id
        const id = req.query.id
        const user = await UserSchema.findOne({ _id: session, 'address._id': id })
        console.log(id);
        res.render('editaddressCheckout', { users: user })
    } catch (error) {
        console.log(error);
    }

}
const updateAddressChekcout = async (req, res) => {
    try {
        const id = req.query.id
        const session = req.session.user_id
        const user = await UserSchema.updateOne({ _id: session }, {
            $set: {
                address: {
                    first_name: req.body.firstName,
                    last_name: req.body.lastName,
                    house: req.body.house,
                    land_mark: req.body.landMark,
                    town: req.body.town,
                    state: req.body.state,
                    pin_code: req.body.pinCode,
                    phone: req.body.phone,
                    email: req.body.email
                }
            }
        })
        res.redirect('/checkout')
    } catch (error) {
        console.log(error);
    }
}
const deleteAddresscheckout = async (req, res) => {
    try {
        const id = req.query.id
        const session = req.session.user_id
        const userdata = await UserSchema.updateOne({ _id: session }, { $pull: { address: { _id: id } } })
        res.redirect('/checkout')
    } catch (error) {
        console.log(error);
    }
}
const applyCoupon = async (req, res) => {
    try {

        const session = req.session.user_id
        const couponCode = req.body.search

        const coupon = await couponModel.findOne({ couponId: couponCode })
        const userCart = await cartModel.findOne({ userId: session })
        const user = await UserSchema.findOne({ _id: session, coupons_applied: coupon._id })
        console.log(coupon._id);
        if (user) {


            res.json({ error: true, })
        } else {
            const updated = await UserSchema.updateOne({ _id: session }, { $push: { coupons_applied: coupon._id } })
            const couponDiscount = (coupon.discount / 100)
            const couponMaxDiscount = coupon.max_discount
            if (coupon) {
                console.log(coupon.minAmount);
                if (userCart.grandTotalPrice >= coupon.minAmount) {
                    if (userCart.grandTotalPrice * couponDiscount > couponMaxDiscount) {
                        console.log('entered in else if');
                        const couponDiscount = coupon.discount
                        const grand = userCart.grandTotalPrice - couponMaxDiscount
                        const cart = await cartModel.findOneAndUpdate({ userId: session }, { $set: { grandTotalPrice: grand } })
                        res.json({ success: true, grand: grand })
                    } else {
                        console.log('entered in if');
                        console.log(couponDiscount);
                        const grand = userCart.grandTotalPrice - (userCart.grandTotalPrice * couponDiscount)
                        console.log(grand);
                        const cart = await cartModel.findOneAndUpdate({ userId: session }, { $set: { grandTotalPrice: grand } })
                        res.json({ success: true, grand: grand })
                    }

                }
            } else {

            }
        }
    } catch (error) {
        console.log(error);
    }
}
const addDeatails = async (req, res) => {
    try {
        const session = req.session.user_id
        const user = await UserSchema.findById({ _id: session })

        if (user) {
            const updated = await UserSchema.updateOne({ _id: session }, {
                $push: {
                    address: {
                        first_name: req.body.firstName,
                        last_name: req.body.lastName,
                        house: req.body.house,
                        land_mark: req.body.landMark,
                        town: req.body.town,
                        state: req.body.state,
                        pin_code: req.body.pinCode,
                        phone: req.body.phone,
                        email: req.body.email
                    }
                }
            })

            res.redirect('address')
        }
    } catch (error) {
        console.log(error);
    }
}
const orderSuccess = async (req, res) => {
    try {
        const coupon = req.body.search
        console.log(coupon);
        const session = req.session.user_id
        const user = await UserSchema.findOne({ _id: session })
        const cartdata = await cartModel.findOne({ userId: session }).populate('item.product')
        const product = await productModel.find()
        const today = new Date();
        const fourDaysLater = new Date(today);
        fourDaysLater.setDate(today.getDate() + 4);
        const grandtotal = cartdata.grandTotalPrice
        const orderitem = cartdata.item.map((value) => {
            return {
                product: value.product,
                price: value.product.price,
                quantity: value.quantity,
                date: today,
                arrive_date: fourDaysLater,
                totalPrice: value.total
            }
        })
        const billAddress = req.session.billAddress
        const order = new orderSchema({
            user: session,
            order: orderitem,
            address: billAddress,
            grandTotal: grandtotal
        })
        const orders = cartdata.item.map((value) => {
            return value.product._id
        })
        const qty = cartdata.item.filter((value) => {
            return value.product
        })
        for (let i = 0; i < qty.length; i++) {
            const x = await productModel.findOne({ _id: qty[i].product })
            let stock = x.stock - qty[i].quantity
            let updatedStock = await productModel.updateMany({ _id: qty[i].product }, { $set: { stock: stock } })
        }
        const saveOrder = await order.save()
        console.log(saveOrder);
        const orderData = await orderSchema.findOne({ _id: saveOrder._id }).populate('order.product')
        if (req.query.methord == "cod") {
            const ids = orderData.order.map((value => {
                return value._id
            }))
            ids.forEach(async (element) => {
                await orderSchema.updateOne({ _id: saveOrder._id, 'order._id': element }, { $set: { 'order.$.payment_type': 'cod' } })
            });
        } else if (req.query.methord == "wallet") {
            if (user.wallet < grandtotal) {
                mes = 'you dont have enough balance'
                res.render('payement', { user: user, mes })
            } else {
                const ids = orderData.order.map((value => {
                    return value._id
                }))
                ids.forEach(async (element) => {
                    await orderSchema.updateOne({ _id: saveOrder._id, 'order._id': element }, { $set: { 'order.$.payment_type': 'wallet' } })
                });
                const newWallet = user.wallet - grandtotal
                await UserSchema.updateOne({ _id: session }, { $set: { wallet: newWallet } })
            }

        } else if (req.query.methord == "razorpay") {
            const ids = orderData.order.map((value => {
                return value._id
            }))
            ids.forEach(async (element) => {
                await orderSchema.updateOne({ _id: saveOrder._id, 'order._id': element }, { $set: { 'order.$.payment_type': 'razor pay' } })
            });

        }
        cartdata.item = []
        cartdata.grandTotalPrice = 0
        await cartdata.save()
        res.render('successPage',orderData)

    } catch (error) {
        console.log(error);
    }
}
const razorpay = async (req, res) => {
    try {
        const session = req.session.user_id
        const cart = await cartModel.findOne({ userId: session })
        var options = {
            amount: cart.grandTotalPrice * 100,  // amount in the smallest currency unit
            currency: "INR",
            receipt: "order_rcptid_11"
        };
        const order = await instance.orders.create(options)
        res.json({ order })

    } catch (error) {
        console.log(error);
    }
}
const payment = async (req, res) => {
    try {
        const session = req.session.user_id

        const cartData = await cartModel.findOne({ userId: session }).populate('item.product')

        const user = await UserSchema.findOne({ _id: session })

        const index = req.body.index

        const billAddress = user.address[index]

        req.session.billAddress = billAddress

        if (req.session.billAddress == undefined || req.session.billAddress == null) {
            message = 'you dont have any address please create an address'
            res.redirect('/checkout')
        }

        res.render('payement', { cartData, user })

    } catch (error) {
        console.log(error);
    }
}


const userLogout = async (req, res) => {
    try {
        console.log("logout start");
        req.session.destroy();
        res.redirect('/login');

    } catch (error) {
        console.log(error.message);

    }
}




module.exports = {
    homeLoad,
    shopLoad,
    searchProducts,
    lowTohigh,
    highTolow,
    userProfilLoad,
    showAddress,
    addNewAddress,
    deleteAddress,
    editAddress,
    updateAddress,
    showUserWallet,
    showOrders,
    loadOrderDetails,
    loadProductDetails,
    loadRegister,
    insertUser,
    loginLoad,
    verifyLogin,
    userLogout,
    otpLogin,
    otp_page,
    otpLogin,
    resendOtp,
    verify_otp,
    loadWishlist,
    addToWishlist,
    removeWishlist,
    productFilter,
    showMen,
    showwomen,
    showWallet,
    showBags,
    showWatch,
    loadCheckout,
    addAddresscheckout,
    insertaddresscheckout,
    editAddressCheckout,
    updateAddressChekcout,
    deleteAddresscheckout,
    applyCoupon,
    addDeatails,
    orderSuccess,
    cancelOrder,
    payment,
    razorpay


}