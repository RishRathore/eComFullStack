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
  },
  orderPlaced: {
    type: Boolean,
    default: false,
  }
},  {
  timestamps: [{ createdAt: 'created_at', updatedAt: 'updated_at' }],
})

module.exports = mongoose.model('Cart', cartSchema)
