import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link } from "react-router-dom";
import { FaShoppingCart } from "react-icons/fa";

import Billing from "../components/Billing";
import { updateCart, removeCart, placeOrder } from "../actions";
import { getMyCart } from "../actions";
import { base64String } from "../utils/sorting";
import { getTotalPrice } from "../utils/calculation";

const MyCart = () => {
  const [subTotal, setSubTotal] = useState(0);
  const [billingData, setBillingData] = useState([]);
  const dispatch = useDispatch();
  const cartItem = useSelector((state) => state.data.cartItem);
  const userId = useSelector((state) => state?.data?.userData.id);

  useEffect(() => {
    dispatch(getMyCart(userId));
  }, [dispatch, userId]);

  useEffect(() => {
    let total = 0;
    let tprice = 0;
    let values = [];
    cartItem.forEach((item) => {
      tprice = getTotalPrice(
        item.product_id.price,
        item.product_id.stock,
        item.quantity
      );
      total = total + tprice.total;
      values.push({ item: item, tprice });
    });
    setBillingData(values);
    setSubTotal(total.toFixed(2));
  }, [cartItem]);

  const handleOrder = () => {
    //   multiples cartId .......
    // const data = {
    //   cartId: "",
    //   totalBill: subTotal,
    //   itemsCount: cartItem.length,
    // };
    // dispatch(placeOrder(userId, data));
    alert("Orderplaced");
  };

  const handleRemoveItem = (product) => {
    const cartId = cartItem[0]?._id
    dispatch(removeCart(cartId, product._id))
      .then(() => {
        setTimeout(() => {
          dispatch(getMyCart(userId));
        }, 1000);
      })
      .catch((err) => {
        console.log("err", err);
      });
  };

  const handleQuantity = (data) => {
    console.log("data", data);
    const params = {
      id: data.val?._id,
      quantity: data.val?.quantity,
      productId: data.val?.product_id?._id,
      operationType: data.flag === "dec" ? "decr" : "incr",
    };

    dispatch(updateCart(params)).then(() => {
      setTimeout(() => {
        dispatch(getMyCart(userId));
      }, 500);
    });
  };

  return (
    <>
      <div className="container my-2 me-auto" style={{ marginTop: "100px" }}>
        <div className=" cart-sec" style={{ display: "flex" }}>
          <div style={{ width: "100%" }}>
              <h4
                className="text-decoration-underline"
                style={{ marginTop: "24px" }}
              >
                {" "}
                My Bag
                <FaShoppingCart />
              </h4>
            {cartItem.length > 0 ? (
              <div className="row d-md-flex  d-sm-block d-block my-2">
                <div className="col-md-5 col-sm-12 col-12  cart-product">
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
                              src={`data:image/png;base64,${base64String(
                                val?.product_id?.image?.data
                              )}`}
                              height={100}
                              width={50}
                              alt="Card"
                            />
                            <div className="card-body px-0 py-2 text-center">
                              <h4 className="card-title">
                                {" "}
                                {val.product_id?.name}{" "}
                              </h4>
                              <p className="card-text mb-0">
                                <strong>${val?.product_id?.price}</strong>
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
                  billingData={billingData}
                  subTotal={subTotal}
                  handleOrder={handleOrder}
                />
              </div>
            ) : (
              <div style={{ marginTop: "10%", marginLeft: "25%" }}>
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
