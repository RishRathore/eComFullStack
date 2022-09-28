import React, { useEffect, useMemo, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Dropdown, SplitButton } from "react-bootstrap";
import { Button, FormControl, InputGroup } from "react-bootstrap";
import { Link } from "react-router-dom";

import {
  getProductsList,
  getSearchProductsList,
} from "../actions";
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

  useMemo(() => {
    sortProducts(products, dropdownValue);
  }, [dropdownValue]);

  const inputChange = (e) => {
    const { value } = e.target;
    setInputValue(value);
  };

  const onSearchProducts = (e) => {
    e.preventDefault();

    if (inputValue.trim() !== "") {
      // api.....for searching
      dispatch(getSearchProductsList(inputValue))
        .then((res) => console.log(res))
        .catch((err) => console.log(err));
    }
    setInputValue("");
  };

  const onReload = () => {
    dispatch(getProductsList());
  };

  return (
    <div className="container" style={{ marginTop: "0", maxWidth: "100%" }}>
      <div
        className="row my-2 mx-0 float-end"
        style={{ placeContent: "center" }}
      >
        <div className="mt-2">
          <SplitButton
            align={{ lg: "end" }}
            title="Sort by"
            id="dropdown-menu-align-responsive-2"
            onSelect={handleSelect}
          >
            <Dropdown.Item eventKey="nameAsc">Name Ascending</Dropdown.Item>
            <Dropdown.Item eventKey="nameDesc">Name Descending</Dropdown.Item>
            <Dropdown.Item eventKey="priceAsc">Price Ascending</Dropdown.Item>
            <Dropdown.Item eventKey="priceDesc">Price Descending</Dropdown.Item>
          </SplitButton>
        </div>
      </div>
      <div className="row h-100 my-3 justify-content-center align-items-center">
        <InputGroup className="col-6  my-2 w-50">
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
            onClick={onReload}
          >
            Reload
          </Button>
        </InputGroup>
      </div>
      <div className="row my-2">
        <Link to={"/create-product"}>
          <Button
            className="bg-success"
            style={{ float: "right", margin: "auto" }}
          >
            {" "}
            Create Product{" "}
          </Button>{" "}
        </Link>
      </div>
      <ProductList products={products} />
    </div>
  );
};

export default Dashboard;