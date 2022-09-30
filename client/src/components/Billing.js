import { Table } from "react-bootstrap";

const Billing = ({ billingData, subTotal,handleOrder }) => (
  <div className="col-md-6 col-sm-12 col-12 my-3 ms-3 billing">
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
          {billingData && 
            billingData.map((data, i) => (
            <tr key={i}  className="border-success">
                <td>{data.item?.productDetails[0]?.name}</td>
                <td>{data.item?.quantity} </td>
                <td>{data.item?.productDetails[0]?.price.toFixed(2)}</td>
                <td> {data?.tprice?.discount}</td>
                <td>$ {data?.tprice?.total}</td>
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