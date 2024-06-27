import React from "react";
import { Formik, Form, Field, ErrorMessage } from "formik";
import * as Yup from "yup";
import axios from "axios";
import { toast } from "react-toastify";

const AddProduct = ({ onAddProduct }) => {
  const initialValues = {
    name: "",
    type: "",
    src: "",
    price: "",
    description: "",
    qty: 1,
    stock: "",
  };

  const validationSchema = Yup.object({
    name: Yup.string().required("Required"),
    type: Yup.string().required("Required"),
    src: Yup.string().url("Invalid URL").required("Required"),
    price: Yup.number()
      .required("Required")
      .positive("Must be a positive number"),
    description: Yup.string().required("Required"),
    stock: Yup.number()
      .required("Required")
      .integer("Must be an integer")
      .min(0, "Stock can't be negative"),
  });

  const handleSubmit = (values, { resetForm }) => {
    console.log(values);

    axios
      .post("http://localhost:5000/products", JSON.stringify(values), {
        headers: {
          "Content-Type": "application/json",
        },
      })
      .then((response) => {
        console.log("Create Successfully", response.data);
        toast.success("Product Successfully added");
        resetForm();
      })
      .catch((error) => {
        console.error("Error:", error);
        toast.error("Added Failed");
      });
  };

  return (
    <Formik
      initialValues={initialValues}
      validationSchema={validationSchema}
      onSubmit={handleSubmit}
    >
      {({ isSubmitting }) => (
        <Form className="max-w-lg mx-auto bg-white p-6 rounded-lg shadow-md mt-5 ml-5 mr-5 sm:ml-64 md:ml-64">
          <h2 className="text-2xl font-bold mb-6">Add New Product</h2>

          <div className="mb-4 flex items-start">
            <label
              className="w-1/3 text-gray-700 text-sm font-bold mb-2"
              htmlFor="name"
            >
              Name
            </label>
            <div className="w-2/3">
              <Field
                type="text"
                name="name"
                className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
              />
              <ErrorMessage
                name="name"
                component="div"
                className="text-red-500 text-sm mt-1"
              />
            </div>
          </div>

          <div className="mb-4 flex items-start">
            <label
              className="w-1/3 text-gray-700 text-sm font-bold mb-2"
              htmlFor="type"
            >
              Type
            </label>
            <div className="w-2/3">
              <Field
                type="text"
                name="type"
                className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
              />
              <ErrorMessage
                name="type"
                component="div"
                className="text-red-500 text-sm mt-1"
              />
            </div>
          </div>

          <div className="mb-4 flex items-start">
            <label
              className="w-1/3 text-gray-700 text-sm font-bold mb-2"
              htmlFor="src"
            >
              Image URL
            </label>
            <div className="w-2/3">
              <Field
                type="text"
                name="src"
                className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
              />
              <ErrorMessage
                name="src"
                component="div"
                className="text-red-500 text-sm mt-1"
              />
            </div>
          </div>

          <div className="mb-4 flex items-start">
            <label
              className="w-1/3 text-gray-700 text-sm font-bold mb-2"
              htmlFor="price"
            >
              Price
            </label>
            <div className="w-2/3">
              <Field
                type="number"
                name="price"
                className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
              />
              <ErrorMessage
                name="price"
                component="div"
                className="text-red-500 text-sm mt-1"
              />
            </div>
          </div>

          <div className="mb-4 flex items-start">
            <label
              className="w-1/3 text-gray-700 text-sm font-bold mb-2"
              htmlFor="description"
            >
              Description
            </label>
            <div className="w-2/3">
              <Field
                as="textarea"
                name="description"
                className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
              />
              <ErrorMessage
                name="description"
                component="div"
                className="text-red-500 text-sm mt-1"
              />
            </div>
          </div>

          <div className="mb-4 flex items-start">
            <label
              className="w-1/3 text-gray-700 text-sm font-bold mb-2"
              htmlFor="stock"
            >
              Stock
            </label>
            <div className="w-2/3">
              <Field
                type="number"
                name="stock"
                className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
              />
              <ErrorMessage
                name="stock"
                component="div"
                className="text-red-500 text-sm mt-1"
              />
            </div>
          </div>

          <button
            type="submit"
            disabled={isSubmitting}
            className="inline-block rounded border border-rose-600 bg-rose-600 px-12 py-3 text-sm font-medium text-white hover:bg-transparent hover:text-rose-600 focus:outline-none focus:ring active:text-rose-500 lg:ml-64 mt-5 mr-5 ml-5 md:ml-64 sm:ml-64"
          >
            {isSubmitting ? "Adding..." : "Add Product"}
          </button>
        </Form>
      )}
    </Formik>
  );
};

export default AddProduct;
