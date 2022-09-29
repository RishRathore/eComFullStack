import React, { useState } from "react";
import * as Yup from "yup";
import { Col, Form, Row, Button } from "react-bootstrap";
import { Formik } from "formik";
import { createProduct } from "../actions";
import { useDispatch } from "react-redux";

function CreateProduct() {
  const dispatch = useDispatch();
  const [imgFile, setImgFile] = useState(null);

  const schema = Yup.object({
    name: Yup.string()
      .min(3, "too short")
      .max(20, "too long")
      .required("required"),
    description: Yup.string().min(5, "too short").required("required"),
    price: Yup.number().min(1, "minimum price must be 1").required("required"),
    stock: Yup.number()
      .min(1, "minimum quantity must be 1")
      .required("required"),
    file: Yup.mixed(),
  });

  return (
    <div className="col-md-8 offset-md-3 col-sm-12 col-12 my-3 billing">
      <h4 className="my-4">
        <span className="text-decoration-underline me-1">
          {" "}
          Create - Product
        </span>{" "}
      </h4>
      <Formik
        validationSchema={schema}
        onSubmit={(values, { resetForm }) => {
          const formData = new FormData();
          formData.append("name", values.name);
          formData.append("image", imgFile);
          formData.append("price", values.price);
          formData.append("stock", values.stock);
          formData.append("description", values.description);

          dispatch(createProduct(formData));
          resetForm();
          setImgFile("")
        }}
        initialValues={{
          name: "",
          description: "",
          price: "",
          stock: "",
          file: null,
        }}
      >
        {({ handleSubmit, handleChange, resetForm, values, errors }) => (
          <Form noValidate onSubmit={handleSubmit}>
            <Row className="mb-3">
              <Row className="mb-3">
                <Form.Group as={Col} md="4" controlId="validationFormikName">
                  <Form.Label>Product name</Form.Label>
                  <Form.Control
                    type="text"
                    name="name"
                    value={values.name}
                    onChange={handleChange}
                  />
                  {errors && errors.name && (
                    <p className="text-danger p-1"> {errors.name}</p>
                  )}
                </Form.Group>
              </Row>
              <Row className="mb-3">
                <Form.Group
                  as={Col}
                  md="4"
                  controlId="validationFormikDescription"
                >
                  <Form.Label>Description</Form.Label>
                  <Form.Control
                    as="textarea"
                    name="description"
                    placeholder="description about product"
                    value={values.description}
                    onChange={handleChange}
                  />
                  {errors && errors.description && (
                    <p className="text-danger p-1"> {errors.description}</p>
                  )}
                </Form.Group>
              </Row>
              <Row className="mb-3">
                <Form.Group as={Col} md="4" controlId="validationFormikPrice">
                  <Form.Label>Price</Form.Label>
                  <Form.Control
                    type="number"
                    name="price"
                    min={1}
                    value={values.price}
                    onChange={handleChange}
                  />
                  {errors && errors.stock && (
                    <p className="text-danger p-1"> {errors.stock}</p>
                  )}
                </Form.Group>
              </Row>
              <Row className="mb-3">
                <Form.Group as={Col} md="4" controlId="validationFormikStock">
                  <Form.Label>Stock</Form.Label>
                  <Form.Control
                    type="number"
                    name="stock"
                    min={1}
                    value={values.stock}
                    onChange={handleChange}
                  />
                  {errors && errors.stock && (
                    <p className="text-danger p-1"> {errors.stock}</p>
                  )}
                </Form.Group>
              </Row>

              <Form.Group className="position-relative mb-3">
                <Form.Label>File</Form.Label>
                <Form.Control
                  className="border-0 w-auto"
                  type="file"
                  required
                  name="file"
                  onChange={(e) => {
                    setImgFile(e.target.files[0]);
                  }}
                />
                {errors && errors.file && (
                  <p className="text-danger p-1"> {errors.file}</p>
                )}
              </Form.Group>
            </Row>
            <Row className="my-2">
              <Col>
                <Button
                  type="button"
                  className="bg-secondary me-2"
                  onClick={() => resetForm()}
                >
                  Cancel
                </Button>
                <Button type="submit" className="bg-success">
                  Create
                </Button>
              </Col>
            </Row>
          </Form>
        )}
      </Formik>
    </div>
  );
}

export default CreateProduct;
