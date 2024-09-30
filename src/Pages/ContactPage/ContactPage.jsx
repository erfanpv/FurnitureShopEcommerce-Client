import React from "react";
import {
  FaUser,
  FaEnvelope,
  FaFileAlt,
  FaPhone,
  FaMapMarkerAlt,
} from "react-icons/fa";
import { Formik, Form, Field, ErrorMessage } from "formik";
import * as Yup from "yup";
import toast from "react-hot-toast";
import { useDispatch } from "react-redux";
import { sendMessage } from "../../app/Slice/adminSlices/contactSlice/contactThunk";

const UserContactPage = () => {
  const dispatch = useDispatch();
  const initialValues = {
    name: "",
    email: "",
    mobile: "",
    subject: "",
    message: "",
  };

  const validationSchema = Yup.object({
    name: Yup.string().required("Full name is required"),
    email: Yup.string()
      .email("Invalid email address")
      .required("Email is required"),
    mobile: Yup.string()
      .matches(/^[0-9]+$/, "Must be only digits")
      .min(10, "Must be exactly 10 digits")
      .max(10, "Must be exactly 10 digits")
      .required("Mobile number is required"),
    subject: Yup.string().required("Subject is required"),
    message: Yup.string().required("Message is required"),
  });

  const handleSubmit = (values, { resetForm }) => {
    dispatch(sendMessage({values, toast, resetForm}));
  };

  return (
    <div className="bg-white min-h-screen flex flex-col items-center justify-center py-5">
      <h1 className="text-4xl font-extrabold text-indigo-800 text-center">
        Contact Us
      </h1>

      <div className="lg:flex lg:justify-between lg:items-start bg-white rounded-lg p-8 lg:w-3/4 gap-12">
        <div className="mb-10 lg:mb-0 lg:w-1/3">
          <h2 className="text-2xl font-semibold mb-6 text-center text-indigo-800">
            Our Office
          </h2>
          <div className="space-y-8 text-center">
            <div className="flex flex-col items-center">
              <FaMapMarkerAlt className="text-3xl text-gray-500 mb-2" />
              <h3 className="font-medium text-lg">Office Address</h3>
              <p>676122 Bridgeon Kinfra, Calicut, India</p>
            </div>
            <div className="flex flex-col items-center">
              <FaPhone className="text-3xl text-gray-500 mb-2" />
              <h3 className="font-medium text-lg">Phone</h3>
              <p>+91 7356848346</p>
            </div>
            <div className="flex flex-col items-center">
              <FaEnvelope className="text-3xl text-gray-500 mb-2" />
              <h3 className="font-medium text-lg">Email</h3>
              <p>woodgaller@company.com</p>
            </div>
          </div>
        </div>

        <Formik
          initialValues={initialValues}
          validationSchema={validationSchema}
          onSubmit={handleSubmit}
        >
          {({ isSubmitting }) => (
            <Form className="lg:w-2/3 bg-white  p-6 text-gray-700  ">
              <div className="mb-6">
                <label className="block font-medium text-lg mb-2">
                  <FaUser className="inline mr-2 text-gray-500" />
                  Full Name
                </label>
                <Field
                  type="text"
                  name="name"
                  className="w-full p-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-500"
                  placeholder="Enter your full name"
                />
                <ErrorMessage
                  name="name"
                  component="div"
                  className="text-red-500 text-sm mt-1"
                />
              </div>

              <div className="mb-6">
                <label className="block font-medium text-lg mb-2">
                  <FaEnvelope className="inline mr-2 text-gray-500" />
                  Email
                </label>
                <Field
                  type="email"
                  name="email"
                  className="w-full p-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-500"
                  placeholder="Enter your email address"
                />
                <ErrorMessage
                  name="email"
                  component="div"
                  className="text-red-500 text-sm mt-1"
                />
              </div>

              <div className="mb-6">
                <label className="block font-medium text-lg mb-2">
                  <FaPhone className="inline mr-2 text-gray-500" />
                  Mobile Number
                </label>
                <Field
                  type="text"
                  name="mobile"
                  className="w-full p-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-500"
                  placeholder="Enter your mobile number"
                />
                <ErrorMessage
                  name="mobile"
                  component="div"
                  className="text-red-500 text-sm mt-1"
                />
              </div>

              <div className="mb-6">
                <label className="block font-medium text-lg mb-2">
                  <FaFileAlt className="inline mr-2 text-gray-500" />
                  Subject
                </label>
                <Field
                  type="text"
                  name="subject"
                  className="w-full p-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-500"
                  placeholder="Enter your subject"
                />
                <ErrorMessage
                  name="subject"
                  component="div"
                  className="text-red-500 text-sm mt-1"
                />
              </div>

              <div className="mb-6">
                <label className="block font-medium text-lg mb-2">
                  Message
                </label>
                <Field
                  as="textarea"
                  name="message"
                  className="w-full p-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-500"
                  rows="6"
                  placeholder="Write your message here"
                />
                <ErrorMessage
                  name="message"
                  component="div"
                  className="text-red-500 text-sm mt-1"
                />
              </div>

              <button
                type="submit"
                disabled={isSubmitting}
                className="w-full bg-indigo-600 text-white py-3 rounded-lg hover:bg-indigo-700 transition duration-300 font-semibold"
              >
                {isSubmitting ? "Sending..." : "Send Message"}
              </button>
            </Form>
          )}
        </Formik>
      </div>
    </div>
  );
};

export default UserContactPage;
