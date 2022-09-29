const mongoose = require("mongoose")

const cartProducts = new mongoose.Schema({
  product_id: {
    type: mongoose.Types.ObjectId,
    ref: "Product"
  },
  quantity: {
    type: Number,
    required: true
  },
})

const cartSchema = new mongoose.Schema({
  user_id: {
    type: String,
    required: true
  },
  orderPlaced: {
    type: Boolean,
    default: false,
  },
  cartProducts: [cartProducts]
},  {
  timestamps: [{ createdAt: 'created_at', updatedAt: 'updated_at' }],
})

module.exports = mongoose.model('Cart', cartSchema)
