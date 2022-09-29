import React, { useEffect } from "react";
import { Table } from "react-bootstrap";
import { FaBoxes } from "react-icons/fa";
import { useDispatch, useSelector } from "react-redux";
import { Link } from "react-router-dom";

import { getordersList } from "../actions";

const Order = () => {
  const dispatch = useDispatch();
  const orderList = useSelector((state) => state?.data?.orders);

  useEffect(() => {
    dispatch(getordersList());
  }, [dispatch]);

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
                <th scope="col">Img</th>
                <th scope="col">Product</th>
                <th scope="col-2">Qty * Rate</th>
                <th scope="col">Total</th>
                <th scope="col">Date</th>
              </tr>
            </thead>
            <tbody className="border-success">
              {orderList &&
                orderList?.map((item, i) => (
                  <tr key={i} className="border-success">
                    <td>{i + 1}</td>
                    <td>
                      <img
                        className="rounded-circle"
                        height="40"
                        width="40"
                        src={item.image}
                        alt="Card"
                      />
                    </td>
                    <td>{item?.name}</td>
                    <td>
                      {item?.quantity} * {item?.price}
                    </td>
                    <td>{item?.total_price}</td>
                    <td>{item?.date?.slice(0, 10)}</td>
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
