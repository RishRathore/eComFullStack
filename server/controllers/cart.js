const Cart = require("../models/cart")
const Product = require("../models/product")

exports.addToCart = async (req, res) => {
  const { uid: userId } = req.params
  const { productId } = req.body

  try {
    const cart = await Cart.find({ user_id: userId })

    const item = {
      product_id: productId,
      quantity: 1
    }

    if (cart && cart.length > 0 && !cart[0].orderPlaced) {
      const cartId = cart[0]._id

      if (!cart[0].orderPlaced) { // if cart is already ordered or not (create new cart)
        const cartProducts = cart[0].cartProducts
        const isProductAlreadyAdded = cartProducts
          .some(({ product_id }) => (String(product_id) === String(productId)));

        if (isProductAlreadyAdded) {
          res.status(403)
          res.send("product already in the cart")
        } else { // if cart already exist, add product in same cart
          await Cart.findOneAndUpdate(
            { _id: cartId },
            { $push: { cartProducts: item } }
          )
          res.status(200)
          res.send("product added!")
          updateProductStock(productId, 'incr');
        }
      }
    } else { // if cart doesn't exist, create one and add product
      const cart = new Cart({
        user_id: userId,
        cartProducts: [item]
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
    const { uid } = req.params
    const carts = await Cart.find({ user_id: uid })
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

    await Cart.updateOne(
      { _id: id },
      { $set : { "cartProducts.$[t].quantity": qty }},
      { arrayFilters : [{"t.product_id" : productId }]}
    )
    updateProductStock(productId, operationType);
    res.status(200)
    res.send('updated')
  } catch (err) {
    console.log("uc err", err)
    res.status(400).json({ err })
  }
}

exports.removeFromCart = async (req, res) => {
  const { id } = req.params
  const { productId } = req.body

  try {
    if (id) {
      await Cart.updateOne(
        { _id : id },
        { $pull : { "cartProducts" : { "product_id": productId }}}
      )
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
      const updatedStock = operationType === 'incr' ? stock - 1 : stock + 1;

      await Product.updateOne(
        { _id: prodId },
        { $set: { stock: updatedStock } }
      );
    }
  } catch (err) {
    console.log(err)
  }
}

