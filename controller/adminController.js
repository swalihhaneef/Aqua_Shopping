const UserSchema = require('../models/userModel');
const orderModel = require('../models/order')
const bannerschema = require('../models/banner')
const couponSchema = require('../models/coupon')
const bcrypt = require('bcrypt');
const sharp = require('sharp')
const fs = require('fs')
const { default: mongoose } = require('mongoose');
const productModel = require('../models/product');
const SalesReport = require('../models/salerReport')
const moment = require('moment-timezone')


let message
let adminname



const securePassword = async (password) => {
    try {
        const passwordHash = await bcrypt.hash(password, 10);
        return passwordHash;
    } catch (error) {
        console.log(error.message);
    }
}

const loadLogin = async (req, res) => {
    try {
        res.render('login');
    } catch (error) {
        console.log(error.message)
    }
}

const verifyLogin = async (req, res) => {
    try {
        const email = req.body.email;
        const password = req.body.password;
        const admindata = await UserSchema.findOne({ email: email });
        if (admindata) {
            const passwordMatch = await bcrypt.compare(password, admindata.password);
            if (passwordMatch) {
                if (admindata.is_admin === 0) {
                    res.render('login', { message: "email or password is incorrect" })
                } else {
                    req.session.admin_id = admindata._id;
                    adminname = admindata.name
                    res.redirect("/admin/dashboard");
                }
            } else {
                res.render('login', { message: "incorrect password" });
            }
        } else {
            res.render('login', { message: "email is incorrect" });
        }
    } catch (error) {
        console.log(error.message);
    }
}

const loadDashboard = async (req, res) => {
    try {
        const product = await productModel.find({})

        const delivered = await orderModel.find({ 'order.status': 'delivered' })
        const pending = await orderModel.find({ 'order.status': 'pending' })
        const refund = await orderModel.find({ 'order.status': 'refund approved' })
        const returnProduct = await orderModel.find({ 'order.status': 'return approved' })
        const user = await UserSchema.find({ is_admin: 0 })
        let grandtotal = delivered.map((value) => {
            return value.grandTotal
        }).reduce((total, num) => {
            return total = total + num
        })
        let profit = grandtotal * (45 / 100)
        let roundedProfit = profit.toFixed(2)
        const status = [delivered.length, pending.length, refund.length, returnProduct.length]
        // Create a new Date object that represents the current date and time
        const currentDate = new Date();

        // Get the month and year from the currentDate object
        const currentMonth = currentDate.getMonth();
        const currentYear = currentDate.getFullYear();

        // Use the current year and month to calculate the number of days in the current month
        const daysInMonth = new Date(currentYear, currentMonth + 1, 0).getDate();

        // Create a new Date object that represents the first day of the current month
        const monthStart = new Date(currentYear, currentMonth, 1);

        // Create a new Date object that represents the last day of the current month
        const monthEnd = new Date(currentYear, currentMonth, daysInMonth);

        // Log the start and end dates of the current month

        const dailySalesDetails = [];

        for (let i = 1; i <= daysInMonth; i++) {
            const date = new Date(currentYear, currentMonth, i);

            const dailySalesData = await SalesReport.find({
                date: {
                    $gte: new Date(currentYear, currentMonth, i, 0, 0, 0),
                    $lte: new Date(currentYear, currentMonth, i, 23, 59, 59),
                },
            });


            const totalSalesOfDay = dailySalesData.reduce((total, report) => {
                return total + report.totalSales;
            }, 0);

            console.log(totalSalesOfDay);
            let productCountOfDay = totalSalesOfDay * .45;
            dailySalesDetails.push({
                date: date,
                totalSales: totalSalesOfDay,
                totalItemsSold: productCountOfDay
            });
        }
///////////////////////////////////////////sales report////////////////////////////////
        const salesReport = await SalesReport.find().populate('userId').populate('products').sort({ date: 1 })
        console.log(salesReport);
        res.render('dashboard', {
            delivered,
            roundedProfit,
            user,
            status,
            dailySalesDetails,
            salesReport

        })
    } catch (error) {
        console.log(error);
    }
}
const showSalesReport = async (req, res) => {
    try {
        console.log(3456);
        const startDate = new Date(req.body.start);
        const endDate = new Date(req.body.end);
        const endOfDay = new Date(endDate.setHours(23, 59, 59, 999));
        console.log(startDate);
        const dailyReport = await SalesReport.find({ date: { $gte: startDate, $lte: endDate } }).populate('userId').populate('products').sort({ date: 1 })
        console.log(3456);
        console.log(dailyReport);
        res.json({ dailyReport });
    } catch (error) {
        console.log(error);
    }
}
const loadhome = async (req, res) => {
    try {
        
            const userdata = await UserSchema.find({ is_admin: 0 })
            res.render('home', { users: userdata });
        
    } catch (error) {
        console.log(error.message);

    }
}

const logout = async (req, res) => {
    try {
        req.session.destroy();
        res.redirect('/admin');

    } catch (error) {
        console.log(error.message);

    }
}
const block_user = async (req, res) => {
    try {
        const id = req.query.id
        const userDoc = await UserSchema.findById({ _id: id })
        if (userDoc.is_blocked == 0) {
            await UserSchema.updateOne({ _id: id }, { $set: { is_blocked: 1 } })
            res.redirect('/admin/user')
        } else {

        }
    } catch (error) {
        console.log(error);
    }
}

const unblock_user = async (req, res) => {
    try {
        const id = req.query.id
        const userDoc = await UserSchema.findById({ _id: id })
        if (userDoc.is_blocked == 1) {
            await UserSchema.updateOne({ _id: id }, { $set: { is_blocked: 0 } })
            res.redirect('/admin/user')
        }
    } catch (error) {
        console.log(error);
    }
}
const listOrders = async (req, res) => {
    try {
        const orders = await orderModel.find().sort({ _id: -1 }).populate('order.product')
        const user = await UserSchema.find()
        res.render('orderlist', { orders: orders, user })
    } catch (error) {
        console.log(error);
    }
}
const orderDetails = async (req, res) => {
    try {
        const id = req.query.id

        const orderData = await orderModel.findOne({ _id: id }).populate('order.product')

        res.render('order-details', { orderData: orderData })
    } catch (error) {
        console.log(error);
    }
}
const approveOrder = async (req, res) => {
    try {
        const today = new Date();
        const id = req.query.id

        const orderData = await orderModel.findOne({ _id: id })

        const ids = orderData.order.map((value => {
            return value._id
        }))
        ids.forEach(async (element) => {
            await orderModel.updateOne({ _id: id, 'order._id': element }, { $set: { 'order.$.status': 'delivered', 'order.$.arrive_date': today } })
        });

        const order = orderData.order.map((value) => {
            return value
        });
        const xx = await orderModel.findOne({ _id: id })
        const y = xx.order.map((value) => {
            return value
        })
        console.log(y, 'dfoidfdfidshfi');

        const salesReport = new SalesReport({
            date: y[0].arrive_date,
            orders: orderData._id,
            products: y[0].product,
            userId: orderData.user,
            totalSales: orderData.grandTotal,

        })
        const x = salesReport.save()
        console.log(x);

        res.redirect('/admin/orders')

    } catch (error) {
        console.log(error);
    }
}
const cancelOrder = async (req, res) => {
    try {

        const id = req.query.id
        const orderData = await orderModel.findOne({ _id: id })

        const ids = orderData.order.map((value => {
            return value._id
        }))
        ids.forEach(async (element) => {
            await orderModel.updateOne({ _id: id, 'order._id': element }, { $set: { 'order.$.status': 'cancelled' } })
        });
        res.redirect('/admin/orders')
    } catch (error) {
        console.log(error);
    }
}
const approverefund = async (req, res) => {
    try {
        const id = req.query.id

        const orderData = await orderModel.findOne({ _id: id })

        const status = orderData.order.map((value => {
            return value._id
        }))
        const payement = orderData.order.map((value => {
            return value.payment_type
        }))
        const cod = status.payment_type
        if (payement != 'cod') {
            console.log('in here');
            const xyz = orderData.user._id
            const users = await UserSchema.findOne({ _id: xyz })
            const xxx = orderData.grandTotal + users.wallet
            const user = await UserSchema.updateOne({ _id: xyz }, { $set: { wallet: xxx } })
            const today = new Date();
            status.forEach(async (element) => {
                await orderModel.updateOne({ _id: id, 'order._id': element }, { $set: { 'order.$.status': 'refund approved', 'order.$.return_date': today } })
            })

            res.redirect('/admin/orders')
        } else {
            console.log('in cod')
            const xyz = orderData.user._id
            const users = await UserSchema.findOne({ _id: xyz })


            status.forEach(async (element) => {
                await orderModel.updateOne({ _id: id, 'order._id': element }, { $set: { 'order.$.status': 'return approved' } })
            })

            res.redirect('/admin/orders')
        }
    } catch (error) {
        console.log(error);
    }
}
const banners = async (req, res) => {
    try {
        msg = null
        const banner = await bannerschema.find()

        res.render('banner', { banner: banner, msg })

    } catch (error) {
        console.log(error);
    }
}
const addBanner = async (req, res) => {
    try {

        res.render('addBanner')
    } catch (error) {
        console.log(error);
    }
}
const insertBanner = async (req, res) => {
    try {
        let image = req.files.map((file) => file);
        console.log(image, 'ldshfaidhsfo');
        for (i = 0; i < req.files.length; i++) {
            let path = image[i].path;
            const processImage = new Promise((resolve, reject) => {
                sharp(path)
                    .rotate()
                    .resize(1400, 800)
                    .toFile("public/product-image/" + image[i].filename, (err) => {
                        sharp.cache(false);
                        if (err) {
                            console.log(err);
                            reject(err);
                        } else {
                            console.log(`Processed file: ${path}`);
                            resolve();
                        }
                    });
            });
            processImage
                .then(() => {
                    fs.unlink(path, (err) => {
                        if (err) {
                            console.log(err);
                        } else {
                            console.log(`Deleted file: ${path}`);
                        }
                    });
                })

                .catch((err) => {
                    console.log(err);
                });

        }





        const banner = new bannerschema({
            header: req.body.header,
            banner_text_upper: req.body.banner_text,
            banner_description: req.body.banner_discription,
            banner_text_down: req.body.banner_text_down,
            images: req.files.map((file) => file.filename),
        })
        const bannerdata = await banner.save()

        res.redirect('/admin/banners')
    } catch (error) {
        console.log(error);
    }
}
const editBanner = async (req, res) => {
    try {
        const id = req.query.id

        const banner = await bannerschema.findOne({ _id: id })
        console.log(banner);
        res.render('editBanner', { banner: banner })
    } catch (error) {
        console.log(error);
    }
}
const updateBanner = async (req, res) => {
    try {
        const id = req.query.id
        console.log(id);
        let image = req.files.map((file) => file);
        console.log(image, 'ldshfaidhsfo');
        for (i = 0; i < req.files.length; i++) {
            let path = image[i].path;
            const processImage = new Promise((resolve, reject) => {
                sharp(path)
                    .rotate()
                    .resize(1300, 700)
                    .toFile("public/product-image/" + image[i].filename, (err) => {
                        sharp.cache(false);
                        if (err) {
                            console.log(err);
                            reject(err);
                        } else {
                            console.log(`Processed file: ${path}`);
                            resolve();
                        }
                    });
            });
            processImage
                .then(() => {
                    fs.unlink(path, (err) => {
                        if (err) {
                            console.log(err);
                        } else {
                            console.log(`Deleted file: ${path}`);
                        }
                    });
                })

                .catch((err) => {
                    console.log(err);
                });

        }
        const updatedBanner = await bannerschema.findByIdAndUpdate({ _id: id }, {
            $set: {
                header: req.body.header,
                banner_text_upper: req.body.banner_text,
                banner_description: req.body.banner_discription,
                banner_text_down: req.body.banner_text_down,
                images: req.files.map((file) => file.filename)
            }
        })
        res.redirect('/admin/banners')
    } catch (error) {
        console.log(error);
    }
}
const deleteBanner = async (req, res) => {
    try {
        const id = req.query.id
        const banner = await bannerschema.deleteOne({ _id: id })
        res.redirect('/admin/banners')

    } catch (error) {
        console.log(error);
    }
}
const loadCoupons = async (req, res) => {
    try {
        const coupon = await couponSchema.find()
        res.render('coupon', { coupon: coupon })
    } catch (error) {
        console.log(error);
    }
}
const addCoupons = async (req, res) => {
    try {
        res.render('create-coupon')
    } catch (error) {
        console.log(error);
    }
}
const insertCoupon = async (req, res) => {
    try {
        const { couponCode, expiryDate, quantity, minAmount, maxAmount, minDiscount, maxDiscount } = req.body
        const coupon = new couponSchema({
            couponId: couponCode,
            expiryDate: expiryDate,
            no_of_Coupon: quantity,
            maxAmount: maxAmount,
            minAmount: minAmount,
            discount: minDiscount,
            max_discount: maxDiscount
        })
        const couponData = await coupon.save()
        res.redirect('/admin/coupons')

    } catch (error) {
        console.log(error);
    }
}
const deletcoupon = async (req, res) => {
    try {
        const id = req.query.id
        const coupon = await couponSchema.deleteOne({ _id: id })
        res.redirect('/admin//coupons')
    } catch (error) {
        console.log(error);
    }
}
module.exports = {
    loadLogin,
    verifyLogin,
    loadDashboard,
    showSalesReport,
    loadhome,
    logout,
    newUserLoad,
    addUser,
    block_user,
    unblock_user,
    listOrders,
    orderDetails,
    approveOrder,
    cancelOrder,
    approverefund,
    banners,
    addBanner,
    insertBanner,
    editBanner,
    updateBanner,
    deleteBanner,
    loadCoupons,
    addCoupons,
    insertCoupon,
    deletcoupon,

}