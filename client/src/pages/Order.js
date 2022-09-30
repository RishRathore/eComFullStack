import React, { useEffect } from "react";
import { Table } from "react-bootstrap";
import { FaBoxes } from "react-icons/fa";
import { useDispatch, useSelector } from "react-redux";
import { Link } from "react-router-dom";

import { getordersList } from "../actions";

import "bootstrap/js/src/collapse";

const Order = () => {
  const dispatch = useDispatch();
  const orderList = useSelector((state) => state?.data?.orders);
  const userId = useSelector((state) => state?.data?.userData.id);

  useEffect(() => {
    dispatch(getordersList(userId));
  }, [dispatch]);

  console.log("ordersList: ", orderList);

  const products = orderList.map((item, i) => {
    const { cartProducts } = item?.cart_id;
    let val = [];
    cartProducts.map((p, ind) => {
      val.push({ id: p.product_id, quantity: p.quantity });
    });
    return val;
  });

  console.log(products[0], "orderlist page");

  return (
    <div className="col-md-8 offset-md-2 col-sm-12 col-12 my-3 billing">
      <h4 className="my-4">
        <span className="text-decoration-underline me-1">My Orders</span>{" "}
        <FaBoxes />{" "}
      </h4>
      {orderList && orderList.length > 0 ? (
        <div className="product-table">
          <Table striped bordered hover variant="light">
            <thead>
              <tr className="border-success">
                <th scope="col"> No.</th>
                <th scope="col">Date</th>
                <th scope="col">Total items</th>
                <th scope="col">Total</th>
              </tr>
            </thead>
            <tbody className="border-success">
              {orderList &&
                orderList?.map((item, i) => (
                  <tr key={item?._id}>
                    <td>{i + 1}</td>
                    <td>{item?.createdAt?.slice(0, 10)}</td>
                    <td>{item?.items_count}</td>
                    <td>$ {item?.total_bill}</td>
                  </tr>
                ))}
            </tbody>
          </Table>
        </div>
      ) : (
        <div style={{ marginTop: "10%", marginLeft: "25%" }}>
          No orders placed yet!.
          <Link to="/"> View Some products</Link>
        </div>
      )}
    </div>
  );
};

export default Order;
