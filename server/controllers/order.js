// var orderList = require("../config");
// const jwt = require("jsonwebtoken");
// const { keys } = require("../config");

// var orders = orderList.orders;

// exports.getOrders = async (req, res) => {
//   let jwtSecretKey = keys.JWT_SECRET_KEY;
//   const token = jwt.sign(req.body, jwtSecretKey, { expiresIn: "3h" });
//   res.status(200);
//   res.send(orders);
// };


const Order = require('../models/order')
const Cart = require('../models/cart')

exports.getOrderHistory = async (req, res) => {
  try {
    const { uid } = req.params
    const myOrders = await Order.find({ user_id: uid }).populate("cart_id")
    res.status(200)
    res.json(myOrders)
  } catch (err) {
    res.status(400).json({ err })
    console.log("err", err)
  }
}

exports.placeOrder = async (req, res) => {
  const { uid: userId } = req.params
  const { cartId, totalBill, itemsCount } = req.body

  console.log('params', userId);
  console.log(cartId, totalBill, itemsCount)

  try {
      const order = new Order({
        cart_id: cartId,
        user_id: userId,
        total_bill: totalBill,
        items_count: itemsCount,
      })
      await order.save()

      updateCartFlag(cartId)
      res.status(200)
      res.send("Order Placed !")
  } catch (err) {
    res.status(400)
    res.send(err)
  }
}

const updateCartFlag = async (cartId) => {
  try {
    const cart = await Cart.findOneAndUpdate({ _id: cartId },
      {
        orderPlaced: true,  
      }, 
      {
        returnOriginal: false
      }
    );
  } catch (err) {
    res.status(400).json({ err })
  }
}