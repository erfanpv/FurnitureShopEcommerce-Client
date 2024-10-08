import React from "react";
import { useFormik } from "formik";
import * as Yup from "yup";
import { Link, useNavigate } from "react-router-dom";
import LoginHeader from "./LoginHeader";
import{ toast} from "react-hot-toast";
import StoreLogo from "../../../assets/Icons/StoreLgo.jpg";
import { useDispatch } from "react-redux";
import { loginUsers } from "../../../app/Slice/userSlices/usersSlice/userThunk";


const LoginForm = () => {

  const navigate = useNavigate();
  const dispatch = useDispatch();

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
      dispatch(loginUsers({ values, navigate, toast }));
    },
  });

  return (
    <>
      <LoginHeader />
      <div className="mx-auto max-w-screen-xl px-4 py-16 sm:px-6 lg:px-8">
        <div className="mx-auto max-w-lg text-center">
          <div className="flex lg:flex-1 justify-center">
            <span className="sr-only">Your Company</span>
            <img className="h-20 rounded-md" src={StoreLogo} alt="" />
          </div>
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
              className="inline-block rounded-lg bg-indigo-500 px-5 py-3 text-sm font-medium text-white hover:bg-transparent hover:text-indigo-600 focus:outline-none focus:ring active:text-indigo-500 border border-indigo-600"
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
