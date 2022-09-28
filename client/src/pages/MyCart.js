import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link } from "react-router-dom";
import { FaShoppingCart } from "react-icons/fa";

import Billing from "../components/Billing";
import CartModel from "../components/CartModel";
import { updateCart, removeCart } from "../actions";
import { getAllCarts } from "../actions";

const MyCart = () => {
  const [modal, setModal] = useState(false);
  const [subTotal, setSubTotal] = useState(0);

  const dispatch = useDispatch();
  let cartItem = useSelector((state) => state.data.cartItem);
  const loginUser = useSelector((state) => state?.data?.userData);

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

  const handleModal = () => setModal(!modal);

  const handleRemoveItem = (product) => {
    removeCart(product.id)
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
    if (data.flag === "dec") {
     dispatch(updateCart({ id: data.val.id, quantity: data.val.quantity - 1 })).then(
        () => {
          setTimeout(() => {
            dispatch(getAllCarts());
          }, 500);
        }
      );
    } else {
      dispatch(updateCart({ id: data.val.id, quantity: data.val.quantity + 1 })).then(() => {
        setTimeout(() => {
          dispatch(getAllCarts());
        }, 500);
      });
    }
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
                          <div className="card my-3 p-0 border-warning">
                            <img
                              className="card-img-top border-bottom"
                              src={val.image}
                              height={100}
                              width={50}
                              alt="Card"
                            />
                            <div className="card-body px-0 py-2 text-center">
                              <h4 className="card-title">
                                {" "}
                                {val.productName}{" "}
                              </h4>
                              <p className="card-text mb-0">
                                <strong>${val.price}</strong>
                              </p>
                              <div className="">
                                <div className="quantity d-flex align-items-center justify-content-center">
                                  <button
                                    className="btn"
                                    disabled={val?.quantity === 1}
                                    onClick={(e) => {
                                      e.preventDefault();
                                      handleQuantity({ val, flag: "dec" });
                                    }}
                                  >
                                    -
                                  </button>
                                  <p className="px-3 py-2 mb-0 bg-warning">
                                    {" "}
                                    {val?.quantity}
                                  </p>
                                  <button
                                    className="btn "
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
                                  X Remove
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
                  handleModal={handleModal}
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
      {modal && (
        <CartModel
          handleModal={handleModal}
          modal={modal}
          total={subTotal}
          user={loginUser}
        />
      )}
    </>
  );
};
export default MyCart;
