import React, { useState, useContext } from "react";
import { useFormik } from "formik";
import * as Yup from "yup";
import { Link, useNavigate } from "react-router-dom";
import axios from "axios";
import LoginHeader from "./LoginHeader";
import MyContext from "../../../utils/Context";
import { toast } from "react-toastify";

const LoginForm = () => {
  const { isloggedIn, setLoggedIn } = useContext(MyContext);

  const navigate = useNavigate();

  const emailRegex = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;

  const formik = useFormik({
    initialValues: {
      email: "",
      password: "",
    },
    validationSchema: Yup.object({
      email: Yup.string()
        .matches(emailRegex, "Invalid Email address")
        .required("Required"),
      password: Yup.string()
        .matches(
          /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{6,}$/,
          "Password must contain at least 6 characters, one uppercase, one lowercase, one number, and one special character"
        )
        .required("Required"),
    }),
    onSubmit: (values) => {
      axios
        .get("http://localhost:5000/users")
        .then((users) => users.data)
        .then((data) => {
          const inputUSer = data.find(
            (user) =>
              user.email == values.email && user.password === values.password
          );
          if (inputUSer) {
            localStorage.setItem("id", inputUSer.id);
            setLoggedIn(true);
            toast.success("Successfully Login");
            navigate("/");
          } else {
            toast.error("Invalid Credentials");
          }
        });
    },
  });

  return (
    <>
      <LoginHeader />
      <div className="mx-auto max-w-screen-xl px-4 py-16 sm:px-6 lg:px-8">
        <div className="mx-auto max-w-lg text-center">
          <h1 className="text-2xl font-bold sm:text-3xl">Get started today!</h1>
          <p className="mt-4 text-gray-500">
            Lorem ipsum dolor sit amet consectetur adipisicing elit. Et libero
            nulla eaque error neque ipsa culpa autem, at itaque nostrum!
          </p>
        </div>

        <form
          onSubmit={formik.handleSubmit}
          className="mx-auto mb-0 mt-8 max-w-md space-y-4"
        >
          <div>
            <label htmlFor="email" className="sr-only">
              Email
            </label>
            <div className="relative">
              <input
                {...formik.getFieldProps("email")}
                type="text"
                className={`w-full rounded-lg p-4 pe-12 text-sm shadow-sm border-2 border-gray-200 ${
                  formik.touched.email && formik.errors.email
                    ? "border-red-500"
                    : ""
                }`}
                placeholder="Enter email"
              />
              {formik.touched.email && formik.errors.email ? (
                <p className="text-red-500 ">{formik.errors.email}</p>
              ) : null}
            </div>
          </div>

          <div>
            <label htmlFor="password" className="sr-only">
              Password
            </label>
            <div className="relative">
              <input
                {...formik.getFieldProps("password")}
                type="password"
                className={`w-full rounded-lg border-gray-200 p-4 pe-12 text-sm shadow-sm border-2 ${
                  formik.touched.password && formik.errors.password
                    ? "border-red-500"
                    : ""
                }`}
                placeholder="Enter password"
              />
              {formik.touched.password && formik.errors.password ? (
                <p className="text-red-500">{formik.errors.password}</p>
              ) : null}
            </div>
          </div>

          <div className="flex items-center justify-between">
            <p className="text-sm text-gray-500">
              No account?
              <Link to="/register" className="underline">
                Sign up
              </Link>
            </p>

            <button
              type="submit"
              className="inline-block rounded-lg bg-blue-500 px-5 py-3 text-sm font-medium text-white"
            >
              Sign in
            </button>
          </div>
        </form>
      </div>
    </>
  );
};

export default LoginForm;
