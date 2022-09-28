import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link } from "react-router-dom";
import { FaShoppingCart } from "react-icons/fa";

import Billing from "../components/Billing";
import { updateCart, removeCart } from "../actions";
import { getAllCarts } from "../actions";

const MyCart = () => {
  const [subTotal, setSubTotal] = useState(0);

  const dispatch = useDispatch();
  let cartItem = useSelector((state) => state.data.cartItem);

  useEffect(() => {
    dispatch(getAllCarts());
  }, [dispatch]);

  useEffect(() => {
    let total = 0;
    cartItem.forEach((item) => {
      total = total + item.total_price;
    });
    setSubTotal(total);
  }, [cartItem]);

  const handleOrder = () => {
    //api for order.....
    alert('Orderplaced');
  };

  const handleRemoveItem = (product) => {
    removeCart(product._id)
      .then(() => {
        setTimeout(() => {
          dispatch(getAllCarts());
        }, 1000);
      })
      .catch((err) => {
        console.log("err", err);
      });
  };

  const handleQuantity = (data) => {
    const params = {
      id: data.val._id,
      productId: data.val.product_id,
      operationType: data.flag === "dec"? 'decr' : 'incr',
    }

    dispatch(updateCart(params))
    .then(() => {
      setTimeout(() => { dispatch(getAllCarts());}, 500);
    });
  };

  return (
    <>
      <div className="container my-2 me-0" style={{ marginTop: "100px" }}>
        <div className=" cart-sec" style={{ display: "flex" }}>
          <div style={{ width: "100%" }}>
            {cartItem.length > 0 && (
              <h4
                className="text-decoration-underline"
                style={{ marginTop: "24px" }}
              >
                {" "}
                My Bag
                <FaShoppingCart />
              </h4>
            )}
            {cartItem.length > 0 ? (
              <div className="row d-md-flex  d-sm-block d-block my-2">
                <div className="col-md-6 col-sm-12 col-12  cart-product">
                  <div className="container product-table p-0">
                    <div
                      className="row align-items-stretch"
                      style={{ placeContent: "center" }}
                    >
                      {cartItem.map((val, index) => (
                        <div key={index} className="col-md-6 col-6 h-100">
                          <div className="card my-3 p-0 border-success">
                            <img
                              className="card-img-top border-bottom"
                              src={val.image}
                              height={100}
                              width={50}
                              alt="Card"
                            />
                            <div className="card-body px-0 py-2 text-center">
                              <h4 className="card-title"> {val.name} </h4>
                              <p className="card-text mb-0">
                                <strong>${val.price}</strong>
                              </p>
                              <div className="">
                                <div className="quantity d-flex align-items-center justify-content-center">
                                  <button
                                    className="btn border-success"
                                    disabled={val?.quantity === 1}
                                    onClick={(e) => {
                                      e.preventDefault();
                                      handleQuantity({ val, flag: "dec" });
                                    }}
                                  >
                                    -
                                  </button>
                                  <p className="px-3 py-2 mb-0 text-success">
                                    {" "}
                                    {val?.quantity}
                                  </p>
                                  <button
                                    className="btn border-success"
                                    disabled={val.stock <= val?.quantity}
                                    onClick={(e) => {
                                      e.preventDefault();
                                      handleQuantity({ val, flag: "inc" });
                                    }}
                                  >
                                    +
                                  </button>
                                </div>
                                <button
                                  className="btn text-danger mt-2"
                                  style={{ textSize: "20px" }}
                                  onClick={() => handleRemoveItem(val)}
                                >
                                  Remove
                                </button>
                              </div>
                            </div>
                          </div>
                        </div>
                      ))}
                    </div>
                  </div>
                </div>
                <Billing
                  cartItem={cartItem}
                  subTotal={subTotal}
                  handleOrder={handleOrder}
                />
              </div>
            ) : (
              <div style={{ marginTop: "20%", marginLeft: "35%" }}>
                Your Basket is empty
                <Link to="/"> View Some products</Link>
              </div>
            )}
            {/*main row...*/}
          </div>
        </div>
      </div>
    </>
  );
};
export default MyCart;
