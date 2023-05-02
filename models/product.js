const mongoose = require('mongoose');


const productSchema = new mongoose.Schema({
 
  name: {
    type: String,
    required: true
  },
  price: {
    type: Number,
    required: true
  },
  material: {
    type: String,
    required: true
  },
  discription: {
    type: String,
    required: true
  },
  category: {
    type: mongoose.Schema.Types.ObjectId,
    required: true,
    ref: 'catogory'
  },
  stock: {
    type: Number,
    required: true
  },
  image: {
    type: Array,
    require: true
  },
  gender:{
    type:Array,
    required:true
},
  is_flagged:{
    type: Number,
    default:0
  }
});

const productModel = mongoose.model('product', productSchema);
module.exports = productModel;
