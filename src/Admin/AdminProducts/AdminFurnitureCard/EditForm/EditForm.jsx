import React, { useEffect, useState } from "react";
import { Formik, Form, Field, ErrorMessage } from "formik";
import * as Yup from "yup";
import axios from "axios";
import { useNavigate, useParams } from "react-router-dom";
import { toast } from "react-toastify";
import ProductShimmer from "../../../../Components/ShimmerUI/ProductShimmer/ProductShimmer";

const EditProduct = () => {
  const { id } = useParams();
  const [productData, setProductData] = useState(null);
  const navigate = useNavigate();

  useEffect(() => {
    axios
      .get(`http://localhost:5000/products/${id}`)
      .then((response) => {
        setProductData(response.data);
      })
      .catch((error) => {
        console.error("Error fetching product:", error);
      });
  }, [id]);

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

  const handleSubmit = (values, { setSubmitting }) => {
    const updated = Object.keys(values).some(
      (key) => values[key] !== productData[key]
    );

    if (updated) {
      axios
        .put(`http://localhost:5000/products/${id}`, values)
        .then((response) => {
          console.log("Product updated successfully:", response.data);
          toast.success("Product updated successfully");
        })
        .catch((error) => {
          console.error("Error updating product:", error);
          toast.error("Failed updating product");
        })
        .finally(() => {
          setSubmitting(false);
        });
    } else {
      toast.info("No changes applied");
      setSubmitting(false);
    }
  };

  if (!productData) {
    return <ProductShimmer />;
  }

  return (
    <div className="max-w-4xl mx-auto mt-8 sm:ml-64 ">
      <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
        <div className="bg-white shadow-md rounded-lg p-6">
          <h2 className="text-2xl font-bold mb-6">Edit Product</h2>

          <Formik
            initialValues={{
              name: productData.name,
              type: productData.type,
              src: productData.src,
              price: productData.price.toString(),
              description: productData.description,
              stock: productData.stock.toString(),
              qty: 1,
            }}
            validationSchema={validationSchema}
            onSubmit={handleSubmit}
          >
            {({ isSubmitting, setFieldValue }) => (
              <Form>
                <div className="mb-4 flex items-start">
                  <label
                    className="w-1/3 md:w-1/4 text-gray-700 text-sm font-bold mb-2"
                    htmlFor="name"
                  >
                    Name
                  </label>
                  <div className="w-2/3 md:w-3/4">
                    <Field
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
                    className="w-1/3 md:w-1/4 text-gray-700 text-sm font-bold mb-2"
                    htmlFor="type"
                  >
                    Type
                  </label>
                  <div className="w-2/3 md:w-3/4">
                    <Field
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
                    className="w-1/3 md:w-1/4 text-gray-700 text-sm font-bold mb-2"
                    htmlFor="src"
                  >
                    Image URL
                  </label>
                  <div className="w-2/3 md:w-3/4">
                    <Field
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
                    className="w-1/3 md:w-1/4 text-gray-700 text-sm font-bold mb-2"
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
                    className="w-1/3 md:w-1/4 text-gray-700 text-sm font-bold mb-2"
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
                    className="w-1/3 md:w-1/4 text-gray-700 text-sm font-bold mb-2"
                    htmlFor="stock"
                  >
                    Stock
                  </label>
                  <div className="w-2/3 md:w-3/4">
                    <Field
                      name="stock"
                      className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                      type="number"
                    />
                    <ErrorMessage
                      name="stock"
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
            src={productData.src}
            alt="Product Image"
            className="w-full h-auto rounded-lg border border-gray-300"
          />
        </div>
      </div>
    </div>
  );
};

export default EditProduct;
