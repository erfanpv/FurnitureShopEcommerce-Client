import React from "react";
import { Formik, Form, Field, ErrorMessage } from "formik";
import * as Yup from "yup";
import { toast } from "react-hot-toast";
import { useDispatch } from "react-redux";
import { addProducts } from "../../../app/Slice/adminSlices/productSlices/adminProductThunk";

const AddProduct = () => {
  const dispatch = useDispatch();

  const initialValues = {
    productName: "",
    category: "",
    image: "",
    price: "",
    description: "",
    stockQuantity: "",
    is_Listed: "true", // default value for dropdown
  };

  const validationSchema = Yup.object({
    productName: Yup.string().required("Required"),
    category: Yup.string().required("Required"),
    image: Yup.string().url("Invalid URL").required("Required"),
    price: Yup.number()
      .required("Required")
      .positive("Must be a positive number"),
    description: Yup.string().required("Required"),
    stockQuantity: Yup.number()
      .required("Required")
      .integer("Must be an integer")
      .min(1, "Stock can't be negative"),
    // is_Listed: Yup.string().required("Please select an option"),
  });

  const handleSubmit = (values, { resetForm }) => {
    // const formattedValues = {
    //   ...values,
    //   is_Listed: values.is_Listed === "true",
    // };

    dispatch(addProducts({ values, toast, resetForm }));
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
              htmlFor="productName"
            >
              Name
            </label>
            <div className="w-2/3">
              <Field
                type="text"
                name="productName"
                className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
              />
              <ErrorMessage
                name="productName"
                component="div"
                className="text-red-500 text-sm mt-1"
              />
            </div>
          </div>

          <div className="mb-4 flex items-start">
            <label
              className="w-1/3 text-gray-700 text-sm font-bold mb-2"
              htmlFor="category"
            >
              Category
            </label>
            <div className="w-2/3">
              <Field
                type="text"
                name="category"
                className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
              />
              <ErrorMessage
                name="category"
                component="div"
                className="text-red-500 text-sm mt-1"
              />
            </div>
          </div>

          <div className="mb-4 flex items-start">
            <label
              className="w-1/3 text-gray-700 text-sm font-bold mb-2"
              htmlFor="image"
            >
              Image URL
            </label>
            <div className="w-2/3">
              <Field
                type="text"
                name="image"
                className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
              />
              <ErrorMessage
                name="image"
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
              htmlFor="stockQuantity"
            >
              Stock Quantity
            </label>
            <div className="w-2/3">
              <Field
                type="number"
                name="stockQuantity"
                className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
              />
              <ErrorMessage
                name="stockQuantity"
                component="div"
                className="text-red-500 text-sm mt-1"
              />
            </div>
          </div>

          {/* <div className="mb-4 flex items-start">
            <label
              className="w-1/3 text-gray-700 text-sm font-bold mb-2"
              htmlFor="is_Listed"
            >
              Listed Status
            </label>
            <div className="w-2/3">
              <Field
                as="select"
                name="is_Listed"
                className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
              >
                <option value="true">Listed</option>
                <option value="false">Not Listed</option>
              </Field>
              <ErrorMessage
                name="is_Listed"
                component="div"
                className="text-red-500 text-sm mt-1"
              />
            </div>
          </div> */}

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
