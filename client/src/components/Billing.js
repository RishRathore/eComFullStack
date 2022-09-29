import { Table } from "react-bootstrap";

const Billing = ({ cartItem, subTotal,handleOrder }) => (
  <div className="col-md-4 col-sm-12 col-12 my-3 ms-5 billing">
    <div className="product-table">
      <Table bordered hover>
        <thead>
          <tr className="border-success">
            <th scope="col">Product</th>
            <th scope="col-2">Qty</th>
            <th scope="col-2">Price</th>
            <th scope="col-2">Dis. %</th>
            
            <th scope="col">Total</th>
          </tr>
        </thead>
        <tbody className="border-success ">
          {cartItem &&
            cartItem.map((item, i) => (
            <tr key={i}  className="border-success">
                <td>{item.product_id?.name}</td>
                <td>{item.quantity} </td>
                <td>{item.product_id?.price}</td>
                <td> </td>
                <td>$ {item.total_price}</td>
              </tr>)
            )}
        </tbody>
      </Table>
    </div>
    <div style={{ display: "flex" }}>
      <h4> Order Total: ${subTotal}</h4>
      <div style={{ marginLeft: "auto" }}>
        <button className="btn btn-success text-white" onClick={handleOrder}>Place your order</button>
      </div>
    </div>
  </div>
)

export default Billing;