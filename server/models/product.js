const mongoose = require("mongoose");

const Schema = mongoose.Schema

const productSchema = new Schema({
  name: {
    type: String,
    required: true,
    unique: true
  },
  price: {
    type: Number,
    required: true
  },
  stock: {
    type: Number,
    required: true
  },
  description: {
    type: String,
  },
  image: {
    data: Buffer,
    contentType: String
  },
}, {
  timestamps: [{ createdAt: 'created_at', updatedAt: 'updated_at' }],
})

module.exports = mongoose.model('Product', productSchema)