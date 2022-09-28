exports.keys = {
  PORT: 8000,
  JWT_SECRET_KEY: "gfg_jwt_secret_key",
  TOKEN_HEADER_KEY: "gfg_token_header_key",
};

exports.carts = [
  {
    id: 1,
    product_id: 1,
    user_id: 1,
    quantity: 1,
  },
];

exports.products = [
  {
    id: 1,
    productName: "Denim jacket",
    price: 100,
    image:
      "https://images.unsplash.com/photo-1516257984-b1b4d707412e?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxzZWFyY2h8M3x8bWVucyUyMGZhc2hpb258ZW58MHx8MHx8&auto=format&fit=crop&w=500&q=60",
    stock: 5,
  },
  {
    id: 2,
    productName: "Fit Mens T-Shirt",
    price: 99,
    image:
      "https://sslimages.shoppersstop.com/sys-master/images/h85/h8f/26840589565982/AW21IPT041_TEAL.jpg_230Wx334H",
    stock: 8,
  },
  {
    id: 3,
    productName: "Denim Knit Mens Shorts",
    price: 89,
    image:
      "https://sslimages.shoppersstop.com/sys-master/images/hf5/h1e/26911938871326/IN-FU014_MID_STONE_alt1.jpg_1088Wx1632H",
    stock: 5,
  },
  {
    id: 4,
    productName: "Crop Fit Mens Jeans",
    price: 170,
    image:
      "https://sslimages.shoppersstop.com/sys-master/images/h5c/h8a/26912193085470/IN-FU07_DARK_INDIGO.jpg_230Wx334H",
    stock: 4,
  },
  {
    id: 5,
    productName: "Mens Casual Wear Shirt",
    price: 159,
    image:
      "https://sslimages.shoppersstop.com/sys-master/images/h37/h04/27074115829790/S22SFWSLPF43152_BEIGE.jpg_230Wx334H",
    stock: 6,
  },
];

exports.orders = [
  {
    id: 5,
    productName: "Mens Casual Wear Shirt",
    price: 159,
    image:
      "https://sslimages.shoppersstop.com/sys-master/images/h37/h04/27074115829790/S22SFWSLPF43152_BEIGE.jpg_230Wx334H",
    stock: 6,
    quantity: 1,
    total_price: 159,
    date: "2022-04-22T08:32:11.860Z",
  },
  {
    id: 4,
    productName: "Crop Fit Mens Jeans",
    price: 170,
    image:
      "https://sslimages.shoppersstop.com/sys-master/images/h5c/h8a/26912193085470/IN-FU07_DARK_INDIGO.jpg_230Wx334H",
    stock: 4,
    quantity: 1,
    total_price: 170,
    date: "2022-04-22T08:32:11.860Z",
  },
  {
    id: 2,
    productName: "Fit Mens T-Shirt",
    price: 99,
    image:
      "https://sslimages.shoppersstop.com/sys-master/images/h85/h8f/26840589565982/AW21IPT041_TEAL.jpg_230Wx334H",
    stock: 7,
    quantity: 5,
    total_price: 495,
    date: "2022-04-22T08:32:11.860Z",
  },
  {
    id: 3,
    productName: "Denim Knit Mens Shorts",
    price: 89,
    image:
      "https://sslimages.shoppersstop.com/sys-master/images/hf5/h1e/26911938871326/IN-FU014_MID_STONE_alt1.jpg_1088Wx1632H",
    stock: 5,
    quantity: 1,
    total_price: 89,
    date: "2022-04-22T08:32:11.860Z",
  },
  {
    id: 1,
    productName: "Denim jacket",
    price: 100,
    image:
      "https://images.unsplash.com/photo-1516257984-b1b4d707412e?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxzZWFyY2h8M3x8bWVucyUyMGZhc2hpb258ZW58MHx8MHx8&auto=format&fit=crop&w=500&q=60",
    stock: 4,
    quantity: 2,
    total_price: 200,
    date: "2022-04-22T09:37:43.323Z",
  },
  {
    id: 1,
    productName: "Denim jacket",
    price: 100,
    image:
      "https://images.unsplash.com/photo-1516257984-b1b4d707412e?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxzZWFyY2h8M3x8bWVucyUyMGZhc2hpb258ZW58MHx8MHx8&auto=format&fit=crop&w=500&q=60",
    stock: 5,
    quantity: 5,
    total_price: 500,
    date: "2022-04-22T09:38:27.678Z",
  },
  {
    id: 1,
    productName: "Denim jacket",
    price: 100,
    image:
      "https://images.unsplash.com/photo-1516257984-b1b4d707412e?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxzZWFyY2h8M3x8bWVucyUyMGZhc2hpb258ZW58MHx8MHx8&auto=format&fit=crop&w=500&q=60",
    stock: 5,
    quantity: 6,
    total_price: 600,
    date: "2022-04-22T10:00:06.904Z",
  },
  {
    id: 3,
    productName: "Denim Knit Mens Shorts",
    price: 89,
    image:
      "https://sslimages.shoppersstop.com/sys-master/images/hf5/h1e/26911938871326/IN-FU014_MID_STONE_alt1.jpg_1088Wx1632H",
    stock: 5,
    quantity: 2,
    total_price: 178,
    date: "2022-04-22T10:00:06.904Z",
  },
  {
    id: 4,
    productName: "Crop Fit Mens Jeans",
    price: 170,
    image:
      "https://sslimages.shoppersstop.com/sys-master/images/h5c/h8a/26912193085470/IN-FU07_DARK_INDIGO.jpg_230Wx334H",
    stock: 4,
    quantity: 1,
    total_price: 170,
    date: "2022-04-22T10:00:06.904Z",
  },
  {
    id: 1,
    productName: "Denim jacket",
    price: 100,
    image:
      "https://images.unsplash.com/photo-1516257984-b1b4d707412e?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxzZWFyY2h8M3x8bWVucyUyMGZhc2hpb258ZW58MHx8MHx8&auto=format&fit=crop&w=500&q=60",
    stock: 4,
    quantity: 2,
    total_price: 200,
    date: "2022-04-22T12:43:25.688Z",
  },
];

exports.users = [
  {
    _id: 1,
    name: "test",
    email: "test@gmail.com",
    password: "test@123",
  },
  {
    _id: 2,
    name: "test1",
    email: "test1@gmail.com",
    password: "test@123",
  },
  {
    _id: 3,
    name: "hello",
    email: "hello@gmail.com",
    password: "test@123",
  },
  {
    _id: 4,
    name: "test55",
    email: "test55@gamil.com",
    password: "test@123",
  },
  {
    _id: 5,
    name: "test55",
    email: "test55@gmail.com",
    password: "Test@123",
  },
  {
    _id: 6,
    name: "test55",
    email: "test11@gmail.com",
    password: "Test@123",
  },
  {
    _id: 7,
    name: "test4",
    email: "test4@gmail.com",
    password: "Test@123",
  },
  {
    _id: 8,
    name: "test5",
    email: "test5@gmail.com",
    password: "Test@123",
  },
  {
    _id: 9,
    name: "abc",
    email: "abc@gmail.com",
    password: "Abc@123",
  },
  {
    _id: 10,
    name: "abcd",
    email: "abcd@gmail.com",
    password: "abcd@123",
  },
  {
    _id: 11,
    name: "testt44",
    email: "test44@gmail.com",
    password: "Test@44",
  },
];
