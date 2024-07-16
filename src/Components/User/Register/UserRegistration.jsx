import React, { useState } from "react";
import { useFormik } from "formik";
import * as Yup from "yup";
import RegisterImg from "../../../assets/Images/Slide-2.jpg";
import { Link, useNavigate } from "react-router-dom";
import { useDispatch } from "react-redux";
import { registerUser } from "../../../app/Thunk/Thunk";
import{ toast} from "react-hot-toast";


const UserRegistration = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const formik = useFormik({
    initialValues: {
      fnName: "",
      lastName: "",
      email: "",
      password: "",
      cpassword: "",
      cart: [],
      orderData: [],
    },

    validationSchema: Yup.object({
      fnName: Yup.string().required("Required"),
      lastName: Yup.string().required("Required"),
      email: Yup.string().email("Invalid Email address").required("Required"),
      password: Yup.string()
        .matches(
          /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{6,}$/,
          "Password must contain at least 6 characters, one uppercase, one lowercase, one number, and one special character"
        )
        .required("Required"),
      cpassword: Yup.string()
        .oneOf([Yup.ref("password"), null], "Passwords does not match")
        .required("Required"),
    }),
    onSubmit: (values) => {
      dispatch(registerUser({ values, navigate, toast }));
    },
  });

  return (
    <div>
      <section className="bg-white">
        <div className="lg:grid lg:min-h-screen lg:grid-cols-12">
          <section className="relative flex h-32 items-end bg-gray-900 lg:col-span-5 lg:h-full xl:col-span-6">
            <img
              alt=""
              src={RegisterImg}
              className="absolute inset-0 h-full w-full object-cover opacity-80"
            />
            <div className="hidden lg:relative lg:block lg:p-12">
              <h2 className="mt-6 text-2xl font-bold text-white sm:text-3xl md:text-4xl">
                Welcome to Wood Gallery 🦑
              </h2>
              <p className="mt-4 leading-relaxed text-white/90">
                Lorem, ipsum dolor sit amet consectetur adipisicing elit.
                Eligendi nam dolorum aliquam, quibusdam aperiam voluptatum.
              </p>
            </div>
          </section>
          <main className="flex items-center justify-center px-8 py-8 sm:px-12 lg:col-span-7 lg:px-16 lg:py-12 xl:col-span-6">
            <div className="max-w-xl lg:max-w-3xl">
              <form
                onSubmit={formik.handleSubmit}
                className="mt-8 grid grid-cols-6 gap-6"
              >
                <div className="col-span-6 sm:col-span-3">
                  <label
                    htmlFor="FirstName"
                    className="block text-sm font-medium text-gray-700"
                  >
                    First Name
                  </label>
                  <input
                    {...formik.getFieldProps("fnName")}
                    type="text"
                    id="FirstName"
                    placeholder="First Name"
                    className={`mt-1 w-full rounded-md border-gray-200 bg-white text-sm text-gray-700 shadow-sm py-2 pl-2 border-2 ${
                      formik.touched.fnName && formik.errors.fnName
                        ? "border-red-500"
                        : ""
                    }`}
                  />
                  {formik.touched.fnName && formik.errors.fnName ? (
                    <p className="text-red-500">{formik.errors.fnName}</p>
                  ) : null}
                </div>
                <div className="col-span-6 sm:col-span-3">
                  <label
                    htmlFor="LastName"
                    className="block text-sm font-medium text-gray-700 "
                  >
                    Last Name
                  </label>
                  <input
                    {...formik.getFieldProps("lastName")}
                    id="LastName"
                    type="text"
                    placeholder="Last Name"
                    className={`mt-1 w-full rounded-md border-gray-200 bg-white text-sm text-gray-700 shadow-sm py-2 pl-2 border-2 ${
                      formik.touched.lastName && formik.errors.lastName
                        ? "border-red-500"
                        : ""
                    }`}
                  />
                  {formik.touched.lastName && formik.errors.lastName ? (
                    <p className="text-red-500">{formik.errors.lastName}</p>
                  ) : null}
                </div>
                <div className="col-span-6">
                  <label
                    htmlFor="Email"
                    className="block text-sm font-medium text-gray-700"
                  >
                    {" "}
                    Email{" "}
                  </label>
                  <input
                    {...formik.getFieldProps("email")}
                    id="Email"
                    type="email"
                    placeholder="Enter Your Email"
                    className={`mt-1 w-full rounded-md border-gray-200 bg-white text-sm text-gray-700 shadow-sm py-2 pl-2 border-2 ${
                      formik.touched.email && formik.errors.email
                        ? "border-red-500"
                        : ""
                    } `}
                  />
                  {formik.touched.email && formik.errors.email ? (
                    <p className="text-red-500">{formik.errors.email}</p>
                  ) : null}
                </div>
                <div className="col-span-6 sm:col-span-3">
                  <label
                    htmlFor="Password"
                    className="block text-sm font-medium text-gray-700"
                  >
                    {" "}
                    Password{" "}
                  </label>
                  <input
                    {...formik.getFieldProps("password")}
                    id="Password"
                    type="password"
                    placeholder="Password"
                    className={`mt-1 w-full rounded-md border-gray-200 bg-white text-sm text-gray-700 shadow-sm py-2 pl-2 border-2 ${
                      formik.touched.password && formik.errors.password
                        ? "border-red-500"
                        : ""
                    }`}
                  />
                  {formik.touched.password && formik.errors.password ? (
                    <p className="text-red-500">{formik.errors.password}</p>
                  ) : null}
                </div>
                <div className="col-span-6 sm:col-span-3">
                  <label
                    htmlFor="PasswordConfirmation"
                    className="block text-sm font-medium text-gray-700"
                  >
                    Password Confirmation
                  </label>
                  <input
                    {...formik.getFieldProps("cpassword")}
                    type="password"
                    id="PasswordConfirmation"
                    placeholder="Confirm Password"
                    className={`mt-1 w-full rounded-md border-gray-200 bg-white text-sm text-gray-700 shadow-sm py-2 pl-2 border-2 ${
                      formik.touched.cpassword && formik.errors.cpassword
                        ? "border-red-500"
                        : ""
                    } `}
                  />
                  {formik.touched.cpassword && formik.errors.cpassword ? (
                    <p className="text-red-500">{formik.errors.cpassword}</p>
                  ) : null}
                </div>
                <div className="col-span-6">
                  <p className="text-sm text-gray-500">
                    By creating an account, you agree to our
                    <a href="#" className="text-blue-700 underline">
                      terms and conditions
                    </a>
                    and
                    <a href="#" className="text-blue-700 underline">
                      privacy policy
                    </a>
                    .
                  </p>
                </div>
                <div className="col-span-6 sm:flex sm:items-center sm:gap-4">
                  <button
                    type="submit"
                    className="inline-block shrink-0 rounded-md border border-indigo-600 bg-indigo-600 px-12 py-3 text-sm font-medium text-white transition hover:bg-transparent hover:text-indigo-600 focus:outline-none focus:ring active:text-indigo-500"
                  >
                    Create an account
                  </button>
                  <p className="mt-4 text-sm text-gray-500 sm:mt-0">
                    Already have an account?
                    <Link to="/login" className="text-blue-700 underline">
                      Log in
                    </Link>
                    .
                  </p>
                </div>
              </form>
            </div>
          </main>
        </div>
      </section>
    </div>
  );
};

export default UserRegistration;
