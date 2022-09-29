const fs = require("fs")
const path = require("path");

const Product = require("../models/product");

exports.getProducts = async (req, res) => {
  try {
    let filter = {}

    if (req?.query?.name) { // search query where "i" stands for case insensitive
      filter = { name: { $regex: new RegExp(req.query.name, 'i') } }
    }

    const products = await Product.find(filter)
    res.status(200);
    res.send(products)
  } catch (err) {
    console.log(err)
    res.status(500).json({ err });
  }
};

exports.addProduct = async (req, res) => {
  try {
    const product = new Product({
      ...req.body,
      image: fs.readFileSync(path.join(__dirname, '../assets/images/') + req.file.filename)
    })
    await product.save()

    res.status(200)
    res.send({ item: product, msg: "product added successfully" })
  } catch (err) {
    console.log(err)
    if (err.code === 11000 && err.keyPattern.hasOwnProperty('name')) {
      res.status(500).json({ err: 'product name is already taken' });
    }
    res.status(500).json({ err });
  }
}
