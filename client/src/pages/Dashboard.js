import React, { useEffect, useMemo, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Dropdown, SplitButton } from "react-bootstrap";
import { Button, FormControl, InputGroup } from "react-bootstrap";
import { Link } from "react-router-dom";

import { getProductsList, getSearchProductsList } from "../actions";
import ProductList from "../components/ProductList";
import { sortProducts } from "../utils/sorting";

const Dashboard = () => {
  const dispatch = useDispatch();
  const [inputValue, setInputValue] = useState("");
  const [dropdownValue, setDropdownValue] = useState("");
  const products = useSelector((state) => state.data.products);

  useEffect(() => {
   dispatch(getProductsList());
  }, [dispatch]);

  const handleSelect = (e) => {
    setDropdownValue(e);
  };

  useEffect(() => {
    sortProducts(products, dropdownValue);
  }, [dropdownValue, products]);

  const inputChange = (e) => {
    const { value } = e.target;
    setInputValue(value);
  };

  const onSearchProducts = (e) => {
    e.preventDefault();

    if (inputValue.trim() !== "") {
      dispatch(getSearchProductsList(inputValue))
    }
  };

  const onRefresh = () => {
    dispatch(getProductsList());
    setInputValue('')
  };

  return (
    <div className="container" style={{ marginTop: "0", maxWidth: "100%" }}>
      <div className="row align-items-center justify-content-end">
        <div className="col-md-6 mx-0 d-flex align-items-center justify-content-center">
          <div className="row mx-0 h-100 my-3">
            <InputGroup className="col-6 my-2">
              <FormControl
                placeholder="Search"
                aria-label="Search"
                value={inputValue}
                onChange={inputChange}
                aria-describedby="basic-addon2"
              />
              <Button
                variant="outline-success"
                id="button-addon2"
                onClick={onSearchProducts}
              >
                Search
              </Button>
              <Button
                className="mx-2"
                variant="outline-success"
                id="button-reload"
                onClick={onRefresh}
              >
                Refresh
              </Button>
            </InputGroup>
          </div>

          <div className="mx-container">
            <div
              className="row my-2 mx-0 float-end"
              // style={{ placeContent: "center" }}
            >
              <div>
                <SplitButton
                  align={{ lg: "end" }}
                  title="Sort by"
                  id="dropdown-menu-align-responsive-2"
                  onSelect={handleSelect}
                >
                  <Dropdown.Item eventKey="nameAsc">
                    Name Ascending
                  </Dropdown.Item>
                  <Dropdown.Item eventKey="nameDesc">
                    Name Descending
                  </Dropdown.Item>
                  <Dropdown.Item eventKey="priceAsc">
                    Price Ascending
                  </Dropdown.Item>
                  <Dropdown.Item eventKey="priceDesc">
                    Price Descending
                  </Dropdown.Item>
                </SplitButton>
              </div>
            </div>
          </div>
        </div>
        <div className="col-md-3 my-2 text-center">
          <Link to={"/create-product"}>
            <Button className="bg-success border-success shadow" >
              {" "}
              Create Product{" "}
            </Button>{" "}
          </Link>
        </div>
      </div>
      <ProductList products={products} />
    </div>
  );
};

export default Dashboard;
