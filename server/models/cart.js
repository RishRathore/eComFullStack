const mongoose = require("mongoose")

const cartSchema = new mongoose.Schema({
  product_id: {
    type: mongoose.Types.ObjectId,
    ref: "Product"
  },
  user_id: {
    type: String,
    required: true
  },
  quantity: {
    type: Number,
    required: true
  }
})

module.exports = mongoose.model('Cart', cartSchema)
