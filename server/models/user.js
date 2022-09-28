const mongoose = require("mongoose")

const Schema = mongoose.Schema

const userSchema = new Schema({
  name: {
    type: String,
    required: true
  },
  email: {
    type: String,
    required: true
  },
  password: {
    type: Number,
    required: true
  },
}, {
  timestamps: [{ createdAt: 'created_at', updatedAt: 'updated_at' }],
})

module.exports = mongoose.model('User', userSchema)