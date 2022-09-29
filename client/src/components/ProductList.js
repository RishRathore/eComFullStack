import React from "react";
import { FaCartPlus } from "react-icons/fa";
import { toast } from "react-toastify";
import { useDispatch, useSelector } from "react-redux";

import { addToCart, getProductsList } from "../actions";
import { base64String } from "../utils/sorting";

const ProductList = ({ products }) => {
  const dispatch = useDispatch();
  const loginUser = useSelector((state) => state?.data?.userData);

  const handleCart = (val) => {
    dispatch(addToCart(val, loginUser.id))
      .then((res) => {
        if (res && res.data) {
          toast(res.data, {
            type: "success",
          });
          dispatch(getProductsList());
        }
      })
      .catch((err) => {
        err && toast("something went wrong!", { type: "error" });
      })
      .catch((err) => {
        console.log(err);
      });
  };

  return (
    <div className="container data bg-light product-table cart-sec my-2 px-0">
      <div
        className="row mx-0 align-items-stretch"
        style={{ placeContent: "center" }}
      >
        <div className="col-md-11 mx-auto">
          <div className="row mx-0">
            {products?.map((product, index) => {
              return (
                <div key={index} className="col-md-6 col-sm-12 col-12 my-3">
                  <div
                    className="card p-md-3 p-sm-2 p-2 bg-light h-100 d-flex flex-row shadow border-success"
                  >
                    <img
                      className="card-img-top w-50"
                      // src={product.image}
                      src={`data:image/png;base64,${base64String(
                        product?.image?.data
                      )}`}
                      alt="Card"
                    />
                    <div className="card-body text-start">
                      <h4 className="card-title"> {product.name} </h4>
                      <p className="card-text mb-2">
                        <strong>${product.price}</strong>
                      </p>
                      <p className="mb-0"> stock {product.stock}</p>
                      <p className="text-primary"></p>
                      <div className="">
                        <button
                          className="btn btn-success mt-2  text-white shadow"
                          style={{ textSize: "20px" }}
                          onClick={() => handleCart(product)}
                          disabled={product.stock < 1}
                        >
                          <FaCartPlus />
                          <span className="ms-2 ">ADD TO BAG</span>
                        </button>
                      </div>
                    </div>
                  </div>
                </div>
              );
            })}
          </div>
        </div>{" "}
      </div>
    </div>
  );
};
export default ProductList;
