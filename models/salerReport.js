const mongoose = require('mongoose');

const salesSchema = new mongoose.Schema({
  date: {
    type: Date,
    required: true
  },
  orders: [{
    type: mongoose.Schema.Types.ObjectId,
    ref: 'orders'
  }],
  products: [{
    type: mongoose.Schema.Types.ObjectId,
    ref: 'product'
  }],
  userId:{
    type: mongoose.Schema.Types.ObjectId,
    ref: 'UserModel'
  },
  totalSales: {
    type: Number,
    required: true
  },
  totalItemsSold: {
    type: Number,
    require: true
  },
  orderId: {
    type: String
  }
});
const SalesReport =  mongoose.model('SalesReport',salesSchema)
module.exports = SalesReport