import { createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";

export const registerUser = createAsyncThunk(
  "users/registerUser",
  async ({ values, navigate, toast }, { rejectWithValue }) => {
    try {
      const response = await axios.post("http://localhost:3000/api/users/register", values);
      if (response.status >= 200 && response.status < 300) {
        toast.success("Registration Successful");
        navigate("/login"); 
        return response.data; 
      } else {
        toast.error("Unexpected response from the server");
        return rejectWithValue(response.data);
      }
    } catch (error) {
      if (error.response.status===409) {
        toast.error("User already exist")
        navigate("/login")
      }else if (error.response.data.message || "Registration Failed") {
        toast.error(error.response.data.message || "Registration Failed");
        return rejectWithValue(error.response.data);
      } else if (error.request) {
        toast.error("No response from the server. Please try again later.");
        return rejectWithValue("No response from server");
      } else {
        toast.error("An error occurred during registration");
        return rejectWithValue("Request setup error");
      }
    }
  }
);


export const loginUsers = createAsyncThunk(
  "users/loginUser",
  async ({ values, navigate, toast }) => {
    try {

      console.log(values);
      


      // const { data: users } = await axios.get("http://localhost:5000/users");
      // const inputUser = users.find(
      //   (user) =>
      //     user.email === values.email && user.password === values.password
      // );

      // if (inputUser) {
      //   toast.success("Successfully Login");
      //   localStorage.setItem("id", inputUser.id);

      //   if (
      //     inputUser.email === "erfanpv786@gmail.com" &&
      //     inputUser.password === "Erfan@123"
      //   ) {
      //     navigate("/admin");
      //   } else {
      //     navigate("/");
      //   }
      //   return inputUser;
      // } else {
      //   toast.error("Invalid Credentials");
      // }
    } catch (error) {
      toast.error("Internal Server Down");
    }
  }
);

const id = localStorage.getItem("id");
export const loginUser = createAsyncThunk("products/loginUser", async () => {
  const response = await axios.get(`http://localhost:5000/users/${id}`);
  return response.data;
});


