// // src/LoginForm.js
// import React from "react";
// import { useFormik } from "formik";
// import * as Yup from "yup";

// const LoginForm = () => {
//   const formik = useFormik({
//     initialValues: {
//       email: "",
//       password: "",
//     },
//     validationSchema: Yup.object({
//       email: Yup.string().email("Invalid email address").required("Required"),
//       password: Yup.string()
//         .min(6, "Password must be at least 6 characters")
//         .required("Required"),
//     }),
//     onSubmit: (values) => {
//       console.log("Form submitted successfully:", values);
//     },
//   });

//   return (
//     <div className="min-h-screen flex items-center justify-center bg-gray-100">
//       <div className="bg-white p-8 rounded-lg shadow-md w-full max-w-md">
//         <h2 className="text-2xl font-bold mb-6 text-gray-800 text-center">
//           Login
//         </h2>
//         <form onSubmit={formik.handleSubmit}>
//           <div className="mb-4">
//             <label
//               className="block text-gray-700 text-sm font-bold mb-2"
//               htmlFor="email"
//             >
//               Email
//             </label>
//             <input
//               type="email"
//               id="email"
//               {...formik.getFieldProps("email")}
//               className={`shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline ${
//                 formik.touched.email && formik.errors.email
//                   ? "border-red-500"
//                   : ""
//               }`}
//               placeholder="Email"
//             />
//             {formik.touched.email && formik.errors.email ? (
//               <p className="text-red-500 text-xs italic">
//                 {formik.errors.email}
//               </p>
//             ) : null}
//           </div>
//           <div className="mb-6">
//             <label
//               className="block text-gray-700 text-sm font-bold mb-2"
//               htmlFor="password"
//             >
//               Password
//             </label>
//             <input
//               type="password"
//               id="password"
//               {...formik.getFieldProps("password")}
//               className={`shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 mb-3 leading-tight focus:outline-none focus:shadow-outline ${
//                 formik.touched.password && formik.errors.password
//                   ? "border-red-500"
//                   : ""
//               }`}
//               placeholder="Password"
//             />
//             {formik.touched.password && formik.errors.password ? (
//               <p className="text-red-500 text-xs italic">
//                 {formik.errors.password}
//               </p>
//             ) : null}
//           </div>
//           <div className="flex items-center justify-between">
//             <button
//               type="submit"
//               className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline"
//             >
//               Sign In
//             </button>
//             <a
//               href="#"
//               className="inline-block align-baseline font-bold text-sm text-blue-500 hover:text-blue-800"
//             >
//               Forgot Password?
//             </a>
//           </div>
//         </form>
//       </div>
//     </div>
//   );
// };

// export default LoginForm;
