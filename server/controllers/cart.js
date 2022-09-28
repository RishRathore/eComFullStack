const Cart = require("../models/cart")
const Product = require("../models/product")

exports.addToCart = async (req, res) => {
  const { id: productId } = req.params
  const { userId } = req.body

  try {
    const fillCarts = await Cart.find({ product_id: productId })
    if (fillCarts.length > 0) {
      res.status(403)
      res.send("product already in the cart")
    } else {
      const cart = new Cart({
        product_id: productId,
        user_id: userId,
        quantity: 1
      })
      await cart.save()
      updateProductStock(productId, 'incr');

      res.status(200)
      res.send("product added!")
    }
  } catch (err) {
    res.status(400)
    res.send(err)
  }
}

exports.getCartList = async (req, res) => {
  try {
    const carts = await Cart.find().populate("product_id")
    res.status(200)
    res.json(carts)
  } catch (err) {
    res.status(400).json({ err })
    console.log("err", err)
  }
}

exports.updateCart = async (req, res) => {
  const { id } = req.params
  const { quantity, operationType, productId } = req.body

  try {
    const qty = operationType === 'incr' ? quantity + 1 : quantity - 1;
    const update = await Cart.updateOne(
      { _id: id },
      { $set: { quantity: qty } }
    );

    updateProductStock(productId, quantity);

    res.status(200)
    res.send(update)
  } catch (err) {
    res.status(400).json({ err })
    res.send(err)
  }
}

exports.flushCart = async (req, res) => {
  const { id } = req.body
  try {
    if (id) {
      await Cart.deleteOne({ _id: id })
      res.status(200)
      res.send("removed")
    }
  } catch (err) {
    res.status(400)
    res.send(err)
  }
}

const updateProductStock = async (prodId, operationType) => {
  try {
    const product = await Product.find({ _id: prodId })

    if (product && product.length > 0) {
      const stock = product[0].stock;
      const qty = operationType === 'incr' ? stock - 1 : quantity + 1;
      const updatedStock = stock - qty;

      await Product.updateOne(
        { _id: prodId },
        { $set: { stock: updatedStock } }
      );
    }
  } catch (err) {
    res.status(400).json({ err })
  }
}

