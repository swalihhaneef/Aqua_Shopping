const productModel = require('../models/product')
const categoryModel = require('../models/catogoryModel')
const sharp = require('sharp')
const path = require('path')
const fs = require('fs')

const productLoad = async (req, res) => {
    const product = await productModel.find().populate('category')
    res.render('product', { product: product })
}

const addProducts = async (req, res) => {
    const refCategory = await categoryModel.find()
    res.render('add_products', { category: refCategory })
}

const insertProduct = async (req, res) => {
    const refCategory = await categoryModel.findOne({ name: req.body.category })
    const name = req.body.name
    const price = req.body.price
    const material = req.body.material
    const category = refCategory._id
    const gender = req.body.gender
    const discription = req.body.discription
    const stock = req.body.stock
    let image = req.files.map((file) => file);
    console.log(image, 'ldshfaidhsfo');
    for (i = 0; i < req.files.length; i++) {
        let path = image[i].path;
        const processImage = new Promise((resolve, reject) => {
            sharp(path)
                .rotate()
                .resize(270, 360)
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
    const product = new productModel({
        name: name,
        price: price,
        material: material,
        discription: discription,
        stock: stock,
        category: category,
        image: req.files.map((file) => file.filename),
        gender: gender
    })
    const productData = await product.save()
    console.log(productData.image);
    if (productData) {
        const product = await productModel.find().populate('category')
        res.render('product', { product: product })
    }
}

const edit_product = async (req, res) => {
    try {
        const id = req.query.id
        const productData = await productModel.findById({ _id: id }).populate('category')
        const category = await categoryModel.find()
        if (productData) {
            res.render('edit-Products', { product: productData, category })
        }
    } catch (error) {
        console.log(error);
    }
}

const update_product = async (req, res) => {
    try {
        const id = req.query.id
        const refCategory = await categoryModel.findOne({ name: req.body.category })
        console.log(refCategory, 'skdlfhod');
        const updated_products = await productModel.findOneAndUpdate({ _id: id }, {
            $set: {
                name: req.body.name,
                price: req.body.price,
                material: req.body.material,
                discription: req.body.discription,
                category: refCategory._id,
                stock: req.body.stock
            }
        })
        res.redirect('/admin/products')
        console.log(req.files);
        if (req.files.length > 0) {
            console.log('hey');
            let image = req.files.map((file) => file);
            console.log(image, 'ldshfaidhsfo');
            for (i = 0; i < req.files.length; i++) {
                let path = image[i].path;
                const processImage = new Promise((resolve, reject) => {
                    sharp(path)
                        .rotate()
                        .resize(270, 360)
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
            console.log(image, 'gfhfjddkd');
            let product = await productModel.findById(id);

            let filenames = req.files.map((file) => file.filename);
            
            let x = await productModel.updateOne({ _id: id }, { $set: { image: product.image.concat(filenames) } });
                        console.log(x);
        }
    } catch (error) {
        console.log(error);
    }
}

const deleteImage = async (req, res) => {
    try {
        const index = req.query.id
        console.log(index);
        const productId = req.query.productID
        console.log(productId);
        const Products = await productModel.findOne({ _id: productId })
        console.log(Products);
        const product = await productModel.updateOne({ _id: productId }, { $pull: { image: { $eq: Products.image[index] } } })
        console.log(product);
        res.redirect('/admin/edit_product?id=' + productId)
    } catch (error) {
        console.log(error);
    }
}

const deleteProduct = async (req, res) => {
    try {
        var id = req.query.id
        await productModel.deleteOne({ _id: id })
        const product = await productModel.find()
        res.render('product', { product: product })
        // res.redirect('/admin/product')
    } catch (error) {
        console.log(error);
    }
}

const flagProduct = async (req, res) => {
    try {
        const id = req.query.id
        const productData = await productModel.findById({ _id: id })
        if (productData.is_flagged == 0) {
            const product = await productModel.find()
            await productModel.updateOne({ _id: id }, { $set: { is_flagged: 1 } })
            res.render('product', { product: product })
        } else {
            const product = await productModel.find()
            await productModel.updateOne({ _id: id }, { $set: { is_flagged: 0 } })
            res.render('product', { product: product })
        }
    } catch (error) {
        console.log(error);
    }
}

module.exports = {
    productLoad,
    addProducts,
    insertProduct,
    edit_product,
    update_product,
    deleteProduct,
    deleteImage,
    flagProduct
}