const cartModel = require('../models/cart')
const productModel = require('../models/product')

const cartLoad = async (req, res) => {
    const session = req.session.user_id
    const cartdata = await cartModel.findOne({ userId: session })
    const limit = 4
    const productData = await productModel.find().limit(limit)
    const cart = await cartModel.findOne({ userId: session }).populate('item.product')
    res.render('shopping-cart', { cart: cart, product: productData })
    console.log(cartdata);
}

const addToCart = async (req, res) => {
    try {
        const userData = req.session.user_id
        const productId = req.query.id
        if (userData) {
            const product = await productModel.findOne({ _id: productId })
            console.log();
            const cartData = await cartModel.findOne({ userId: userData })
            const cartCount = await cartModel.findOne({ userId: userData, "item.product": productId })
            console.log(cartData);
            if (cartData) {
                if (cartCount) {
                    const inccart = await cartModel.updateOne({ userId: userData, "item.product": productId }, { $inc: { "item.$.quantity": 1 } })
                    res.send({ success: true, message: `This product is already in your cart` })
                } else {
                    const cart = await cartModel.updateOne({ userId: userData }, { $push: { item: { product: product._id, name: product.name, quantity: 1, price: product.price, total: product.price } }, grandTotalPrice: product.price })
                    res.send({ success: true, message: `This product added to your cart successfully` })
                }
            } else {

                const updateData = await cartModel.insertMany({
                    userId: userData, item: {
                        product: product._id,
                        name: product.name,
                        quantity: product.quantity,
                        price: product.price, total: product.price
                    }, grandTotalPrice: product.price
                })
                res.send({ success: true, message: `looooooooooo` })
            }
        } else {
            res.redirect('/login')
        }
    } catch (error) {
        console.log(error);
    }
}
const increment = async (req, res) => {
    const id = req.body.id
    const user = req.session.user_id
    await cartModel.updateOne({ userId: user, 'item.product': id }, { $inc: { "item.$.quantity": 1 } })
    let cartData = await cartModel.findOne({ userId: user })

    let cartinc

    cartinc = cartData.item.filter((value) => {
        return value.product == id
    })
    console.log(cartinc);
    const grandTotal = cartinc[0].quantity * cartinc[0].price
    console.log(grandTotal);
    await cartModel.updateOne({ userId: user, 'item.product': id }, { $set: { "item.$.total": grandTotal } })
    cartData = await cartModel.findOne({ userId: user })
    let grandTotalPrice = cartData.item.map((value) => {
        return value.total
    }).reduce((total, num) => {
        return total = total + num
    })
    console.log(grandTotalPrice);
    cartData.item.forEach(async (element) => {
        await cartModel.updateOne({ userId: user, 'item._id': element._id }, { $set: { grandTotalPrice: grandTotalPrice } })
    });
    cartData = await cartModel.findOne({ userId: user })
    cartinc = cartData.item.filter((value) => {
        return value.product == id
    })
    const quantity = cartinc[0].quantity
    const total = cartinc[0].total
    const grandTotals = cartData.grandTotalPrice

    res.json({ quantity, total, grandTotals, id })
}
const decrement = async (req, res) => {
    try {
        const user = req.session.user_id
        const product = req.body.id
        const cartDAta = await cartModel.findOne({ userId: user })
        let cartqty = cartDAta.item.map((value) => {
            return value.quantity
        })
        console.log(cartqty + 'yeeeey');
        console.log(cartDAta.item + 'heyyy');
        if (cartqty <= 1) {
            res.json('lasdhflklkd')
        } else {
            await cartModel.updateOne({ userId: user, 'item.product': product }, { $inc: { "item.$.quantity": -1 } })
            let cartData = await cartModel.findOne({ userId: user })
            let cartdec
            cartdec = cartData.item.filter((value) => {
                return value.product == product
            })
            console.log(cartdec);
            let grandTotal = cartdec[0].quantity * cartdec[0].price
            console.log(grandTotal);
            await cartModel.updateOne({ userId: user, 'item.product': product }, { $set: { 'item.$.total': grandTotal } })
            cartData = await cartModel.findOne({ userId: user })
            let grandTotalPrice = cartData.item.map((value) => {
                return value.total
            }).reduce((total, num) => {
                return total = total + num
            })
            console.log(grandTotalPrice);
            cartData.item.forEach(async (element) => {
                await cartModel.updateOne({ userId: user, 'item._id': element._id }, { $set: { grandTotalPrice: grandTotalPrice } })
            })

            cartData = await cartModel.findOne({ userId: user })
            cartdec = cartData.item.filter((value) => {
                return value.product == product
            })
            const quantity = cartdec[0].quantity
            const total = cartdec[0].total
            const grandTotals = cartData.grandTotalPrice
            console.log(quantity);
            console.log(total);
            console.log(grandTotals);
            res.json({ quantity, total, grandTotals, product })
        }
    } catch (error) {
        console.log(error);
    }
}

const deleteCart = async (req, res) => {
    try {
        const session = req.session.user_id
        const id = req.query.id
        const cartData = await cartModel.updateOne({ userId: session }, { $pull: { item: { product: id } } })
        res.redirect('/shopping-cart')
    } catch (error) {
        console.log(error);
    }
}
module.exports = {
    cartLoad,
    addToCart,
    increment,
    decrement,
    deleteCart
}