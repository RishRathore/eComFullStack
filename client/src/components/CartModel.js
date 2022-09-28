import React from "react";
import { Modal } from "react-bootstrap";
import { toast } from "react-toastify";
import { FaUserCircle } from "react-icons/fa";
import { useHistory } from "react-router";
import { useDispatch } from "react-redux";
import { removeCart, getordersList } from "../actions";

function CartModel({ modal, handleModal, total, user }) {
  const dispatch = useDispatch();
  toast.configure();
  const history = useHistory();

  const orderPlaced = () => {
    handleModal();
    dispatch(getordersList());
    history.push("/orders");
    toast("Order placed successfully!", { type: "success" });
    dispatch(removeCart());
  };

  return (
    <Modal show={modal} onHide={handleModal}>
      <Modal.Header className="bg-warning text-light" closeButton>
        <Modal.Title>
          {" "}
          <strong> Orders </strong>{" "}
        </Modal.Title>
      </Modal.Header>
      <Modal.Body>
        <div className="modal-body bg-white">
          <div className="body-name">
            <FaUserCircle /> <strong>Name: {user?.username} </strong>
          </div>

          <div className="body-price">
            <strong>Order Total: ${total} </strong>
          </div>
        </div>
      </Modal.Body>
      <Modal.Footer className="bg-light">
        <button
          className="btn btn-dark mt-2"
          style={{ textSize: "20px" }}
          onClick={orderPlaced}
        >
          Continue
        </button>
      </Modal.Footer>
    </Modal>
  );
}

export default CartModel;
