import React, { useEffect } from "react";
import { Formik, Form, Field, ErrorMessage } from "formik";
import * as Yup from "yup";
import axios from "axios";
import { useNavigate, useParams } from "react-router-dom";
import { toast } from "react-toastify";
import { useDispatch, useSelector } from "react-redux";
import {
  adminGetProductWithId,
  updateProducts,
} from "../../../../app/Slice/adminSlices/productSlices/adminProductThunk";

const EditProduct = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const { product } = useSelector((state) => state.adminProducts);

  useEffect(() => {
    dispatch(adminGetProductWithId({ id }));
  }, [dispatch, id]);

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
    is_Listed: Yup.string().required("Please select an option"),
  });

  const handleSubmit = (values, { setSubmitting }) => {
    const updated = Object.keys(values).some(
      (key) => values[key] !== product[key]
    );

    if (updated) {
      dispatch(updateProducts({ id,values, toast,navigate }));
      // axios
      //   .put(`http://localhost:5000/products/${id}`, values)
      //   .then((response) => {
      //     console.log("Product updated successfully:", response.data);
      //     toast.success("Product updated successfully");
      //     navigate("/admin/productlist");
      //   })
      //   .catch((error) => {
      //     console.error("Error updating product:", error);
      //     toast.error("Failed to update product");
      //   })
      //   .finally(() => {
      //     setSubmitting(false);
      //   });
    } else {
      toast.info("No changes applied");
      setSubmitting(false);
    }
  };

  return (
    <div className="max-w-4xl mx-auto mt-8 sm:ml-64 ">
      <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
        <div className="bg-white shadow-md rounded-lg p-6">
          <h2 className="text-2xl font-bold mb-6">Edit Product</h2>

          <Formik
            initialValues={{
              productName: product?.productName || "",
              category: product?.category || "",
              image: product?.image || "",
              price: product?.price || 0,
              description: product?.description || "",
              stockQuantity: product?.stockQuantity || 0,
              is_Listed: product?.is_Listed,
            }}
            validationSchema={validationSchema}
            enableReinitialize
            onSubmit={handleSubmit}
          >
            {({ isSubmitting }) => (
              <Form>
                <div className="mb-4 flex items-start">
                  <label
                    className="w-1/3 text-gray-700 text-sm font-bold mb-2"
                    htmlFor="productName"
                  >
                    Name
                  </label>
                  <div className="w-2/3 md:w-3/4">
                    <Field
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
                  <div className="w-2/3 md:w-3/4">
                    <Field
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
                  <div className="w-2/3 md:w-3/4">
                    <Field
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
                  <div className="w-2/3 md:w-3/4">
                    <Field
                      name="price"
                      className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                      type="number"
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
                  <div className="w-2/3 md:w-3/4">
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
                  <div className="w-2/3 md:w-3/4">
                    <Field
                      name="stockQuantity"
                      className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                      type="number"
                    />
                    <ErrorMessage
                      name="stockQuantity"
                      component="div"
                      className="text-red-500 text-sm mt-1"
                    />
                  </div>
                </div>

                <div className="mb-4 flex items-start">
                  <label
                    className="w-1/3 text-gray-700 text-sm font-bold mb-2"
                    htmlFor="is_Listed"
                  >
                    Listed Status
                  </label>
                  <div className="w-2/3 md:w-3/4">
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
                </div>

                <div className="flex justify-between mt-6">
                  <button
                    type="submit"
                    disabled={isSubmitting}
                    className="inline-block rounded border border-indigo-600 bg-indigo-600 px-12 py-3 text-sm font-medium text-white hover:bg-transparent hover:text-indigo-600 focus:outline-none focus:ring active:text-indigo-500 "
                  >
                    {isSubmitting ? "Editing..." : "Edit Product"}
                  </button>
                  <button
                    onClick={() => navigate("/admin/productlist")}
                    type="button"
                    className="inline-block rounded border border-rose-600 bg-rose-600 px-12 py-3 text-sm font-medium text-white hover:bg-transparent hover:text-rose-600 focus:outline-none focus:ring active:text-rose-500"
                  >
                    Cancel
                  </button>
                </div>
              </Form>
            )}
          </Formik>
        </div>

        <div className="bg-white shadow-md rounded-lg p-6">
          <h2 className="text-xl font-bold mb-4">Product Image Preview</h2>
          <img
            src={product?.image}
            alt="Product Image"
            className="w-full h-auto rounded-lg border border-gray-300"
          />
        </div>
      </div>
    </div>
  );
};

export default EditProduct;
