const mongoose = require("mongoose")

const orderSchema = mongoose.Schema({
  total_bill: {
    type: Number,
    required: true
  },
  user_id: {
    type: String,
    required: true
  },
  items_count: {
    type: Number,
    required: true
  },
  cart_id: {
    type: mongoose.Types.ObjectId,
    ref: "Cart"
  },
}, {
  timestamps: [{ createdAt: 'created_at', updatedAt: 'updated_at' }],
})


module.exports = mongoose.model('Order', orderSchema)
