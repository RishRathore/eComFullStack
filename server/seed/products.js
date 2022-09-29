const fs = require("fs")
const path = require("path");
module.exports = [
  {
    name: "Denim jacket",
    price: 100,
    image: fs.readFileSync(path.join(__dirname, './images/') + "image1.jpg"),
    stock: 5,
    description: "Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book",

  },
  {
    name: "Fit Mens T-Shirt",
    price: 99,
    image: fs.readFileSync(path.join(__dirname, './images/') + "image2.jpg"),
    stock: 8,
    description: "Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book",
  },
  {
    name: "Denim Knit Mens Shorts",
    price: 89,
    image: fs.readFileSync(path.join(__dirname, './images/') + "image3.jpg"),
    stock: 5,
    description: "Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book",
  },
  {
    name: "Crop Fit Mens Jeans",
    price: 170,
    image: fs.readFileSync(path.join(__dirname, './images/') + "image4.jpg"),
    stock: 4,
    description: "Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book",
  },
  {
    name: "Mens Casual Wear Shirt",
    price: 159,
    image: fs.readFileSync(path.join(__dirname, './images/') + "image5.jpg"),
    stock: 6,
  },
]