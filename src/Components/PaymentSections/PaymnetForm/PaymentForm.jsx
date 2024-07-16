import React, { useContext, useState, useEffect } from "react";
import { useFormik } from "formik";
import * as Yup from "yup";
import { useNavigate } from "react-router-dom";
import MyContext from "../../../utils/Context";
import PaymentPopup from "../SuccessPayment/PaymnetPopup";
import CartModal from "../../Modal/Modal";
import axios from "axios";
import { toast } from "react-toastify";

const PaymentForm = () => {
  const id = localStorage.getItem("id");

  const [isVisible, setVisible] = useState(false);
  const navigate = useNavigate();
  const { TotalAmount, addCart, setAddCart } = useContext(MyContext);
  const [orderData, setOrderData] = useState([]);

  useEffect(() => {
    const fetchUserOrders = async () => {
      try {
        const response = await axios.get(`http://localhost:5000/users/${id}`);
        setOrderData(response.data.orderData || []);
      } catch (error) {
        console.error("Error fetching user orders:", error);
      }
    };

    fetchUserOrders();
  }, [id]);

  const formik = useFormik({
    initialValues: {
      email: "",
      cardHolder: "",
      cardNo: "",
      creditExpiry: "",
      creditCvc: "",
      billingAddress: "",
    },
    validationSchema: Yup.object({
      email: Yup.string().email("Invalid email address").required("Required"),
      cardHolder: Yup.string().required("Required"),
      cardNo: Yup.string()
        .matches(/^[0-9]{16}$/, "Invalid card number")
        .required("Required"),
      creditExpiry: Yup.string()
        .matches(/^(0[1-9]|1[0-2])\/?([0-9]{2})$/, "Invalid expiry date")
        .required("Required"),
      creditCvc: Yup.string()
        .matches(/^[0-9]{3,4}$/, "Invalid CVC")
        .required("Required"),
      billingAddress: Yup.string().required("Required"),
    }),
    onSubmit: async (values) => {
      try {
        const newOrder = {
          cartItems: addCart,
          total: TotalAmount,
          email: values.email,
          cardHolder: values.cardHolder,
          billingAddress: values.billingAddress,
          orderDate: new Date().toISOString(),
        };

        await axios.patch(`http://localhost:5000/users/${id}`, {
          orderData: [...orderData, newOrder],
          cart: [],
        });

        setAddCart([]);

        setVisible(true);
        toast.success("Order placed successfully!");
      } catch (err) {
        console.error("Error placing order:", err);
        toast.error("Failed to place order");
      }
    },
  });

  return (
    <>
      <div className="mt-10 bg-gray-50 px-4 pt-8 lg:mt-0 shadow-lg">
        <p className="text-xl font-medium">Payment Details</p>
        <p className="text-gray-400">
          Complete your order by providing your payment details.
        </p>
        <form onSubmit={formik.handleSubmit}>
          <label
            htmlFor="email"
            className="mt-4 mb-2 block text-sm font-medium"
          >
            Email
          </label>
          <div className="relative">
            <input
              type="text"
              id="email"
              name="email"
              className={`w-full rounded-md border ${
                formik.touched.email && formik.errors.email
                  ? "border-red-500"
                  : "border-gray-200"
              } px-4 py-3 pl-11 text-sm shadow-sm outline-none focus:z-10 focus:border-blue-500 focus:ring-blue-500`}
              placeholder="your.email@gmail.com"
              {...formik.getFieldProps("email")}
            />
            {formik.touched.email && formik.errors.email ? (
              <div className="text-red-500 text-xs mt-1">
                {formik.errors.email}
              </div>
            ) : null}
            <div className="pointer-events-none absolute inset-y-0 left-0 inline-flex items-center px-3">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                className="h-4 w-4 text-gray-400"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
                strokeWidth="2"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  d="M16 12a4 4 0 10-8 0 4 4 0 008 0zm0 0v1.5a2.5 2.5 0 005 0V12a9 9 0 10-18 0v1.5a2.5 2.5 0 005 0V12"
                />
              </svg>
            </div>
          </div>

          <label
            htmlFor="cardHolder"
            className="mt-4 mb-2 block text-sm font-medium"
          >
            Card Holder
          </label>
          <div className="relative">
            <input
              type="text"
              id="cardHolder"
              name="cardHolder"
              className={`w-full rounded-md border ${
                formik.touched.cardHolder && formik.errors.cardHolder
                  ? "border-red-500"
                  : "border-gray-200"
              } px-4 py-3 pl-11 text-sm shadow-sm outline-none focus:z-10 focus:border-blue-500 focus:ring-blue-500`}
              placeholder="Your full name here"
              {...formik.getFieldProps("cardHolder")}
            />
            {formik.touched.cardHolder && formik.errors.cardHolder ? (
              <div className="text-red-500 text-xs mt-1">
                {formik.errors.cardHolder}
              </div>
            ) : null}
            <div className="pointer-events-none absolute inset-y-0 left-0 inline-flex items-center px-3">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                className="h-4 w-4 text-gray-400"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
                strokeWidth="2"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  d="M12 11c0-1.38-1.12-2.5-2.5-2.5S7 9.62 7 11s1.12 2.5 2.5 2.5S12 12.38 12 11z"
                />
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  d="M10.5 11V4m0 15v-4"
                />
              </svg>
            </div>
          </div>

          <label
            htmlFor="cardNo"
            className="mt-4 mb-2 block text-sm font-medium"
          >
            Card Details
          </label>
          <div className="flex flex-wrap gap-2">
            <div className="relative w-full sm:w-7/12">
              <input
                type="text"
                id="cardNo"
                name="cardNo"
                className={`w-full rounded-md border ${
                  formik.touched.cardNo && formik.errors.cardNo
                    ? "border-red-500"
                    : "border-gray-200"
                } px-4 py-3 pl-11 text-sm shadow-sm outline-none focus:z-10 focus:border-blue-500 focus:ring-blue-500`}
                placeholder="xxxx-xxxx-xxxx-xxxx"
                {...formik.getFieldProps("cardNo")}
              />
              {formik.touched.cardNo && formik.errors.cardNo ? (
                <div className="text-red-500 text-xs mt-1">
                  {formik.errors.cardNo}
                </div>
              ) : null}
              <div className="pointer-events-none absolute inset-y-0 left-0 inline-flex items-center px-3">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  className="h-4 w-4 text-gray-400"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                  strokeWidth="2"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    d="M12 11c0-1.38-1.12-2.5-2.5-2.5S7 9.62 7 11s1.12 2.5 2.5 2.5S12 12.38 12 11z"
                  />
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    d="M10.5 11V4m0 15v-4"
                  />
                </svg>
              </div>
            </div>
            <div className="relative w-full sm:w-1/6">
              <input
                type="text"
                name="creditExpiry"
                className={`w-full rounded-md border ${
                  formik.touched.creditExpiry && formik.errors.creditExpiry
                    ? "border-red-500"
                    : "border-gray-200"
                } px-4 py-3 text-sm shadow-sm outline-none focus:z-10 focus:border-blue-500 focus:ring-blue-500`}
                placeholder="MM/YY"
                {...formik.getFieldProps("creditExpiry")}
              />
              {formik.touched.creditExpiry && formik.errors.creditExpiry ? (
                <div className="text-red-500 text-xs mt-1">
                  {formik.errors.creditExpiry}
                </div>
              ) : null}
            </div>
            <div className="relative w-full sm:w-1/6">
              <input
                type="text"
                name="creditCvc"
                className={`w-full rounded-md border ${
                  formik.touched.creditCvc && formik.errors.creditCvc
                    ? "border-red-500"
                    : "border-gray-200"
                } px-4 py-3 text-sm shadow-sm outline-none focus:z-10 focus:border-blue-500 focus:ring-blue-500`}
                placeholder="CVC"
                {...formik.getFieldProps("creditCvc")}
              />
              {formik.touched.creditCvc && formik.errors.creditCvc ? (
                <div className="text-red-500 text-xs mt-1">
                  {formik.errors.creditCvc}
                </div>
              ) : null}
            </div>
          </div>

          <label
            htmlFor="billingAddress"
            className="mt-4 mb-2 block text-sm font-medium"
          >
            Billing Address
          </label>
          <div className="relative">
            <input
              type="text"
              id="billingAddress"
              name="billingAddress"
              className={`w-full rounded-md border ${
                formik.touched.billingAddress && formik.errors.billingAddress
                  ? "border-red-500"
                  : "border-gray-200"
              } px-4 py-3 pl-11 text-sm shadow-sm outline-none focus:z-10 focus:border-blue-500 focus:ring-blue-500`}
              placeholder="Street Address"
              {...formik.getFieldProps("billingAddress")}
            />
            {formik.touched.billingAddress && formik.errors.billingAddress ? (
              <div className="text-red-500 text-xs mt-1">
                {formik.errors.billingAddress}
              </div>
            ) : null}
            <div className="pointer-events-none absolute inset-y-0 left-0 inline-flex items-center px-3">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                className="h-4 w-4 text-gray-400"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
                strokeWidth="2"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  d="M12 11c0-1.38-1.12-2.5-2.5-2.5S7 9.62 7 11s1.12 2.5 2.5 2.5S12 12.38 12 11z"
                />
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  d="M10.5 11V4m0 15v-4"
                />
              </svg>
            </div>
          </div>

          <div className="mt-6 border-t border-b py-2">
            <div className="flex items-center justify-between">
              <p className="text-sm font-medium text-gray-900">
                Subtotal (Including Tax)
              </p>
              <p className="font-semibold text-gray-900">${TotalAmount}</p>
            </div>
            <div className="flex items-center justify-between">
              <p className="text-sm font-medium text-gray-900">
                Shipping & handling
              </p>
              <p className="font-semibold text-gray-900">$0.00</p>
            </div>
          </div>
          <div className="mt-6 flex items-center justify-between">
            <p className="text-sm font-medium text-gray-900">Total</p>
            <p className="text-2xl font-semibold text-gray-900">
              ${TotalAmount}
            </p>
          </div>

          <button
            type="submit"
            className="mt-4 w-full rounded-md bg-indigo-900 px-6 py-3 font-medium text-white"
          >
            Place Order
          </button>
          <button
            onClick={() => navigate("/products/cart/mycart")}
            className="mt-4 mb-8 w-full rounded-md bg-rose-600 px-6 py-3 font-medium text-white"
          >
            Back
          </button>
        </form>
      </div>
      <CartModal isVisible={isVisible} className="hidden">
        <PaymentPopup />
      </CartModal>
    </>
  );
};

export default PaymentForm;
