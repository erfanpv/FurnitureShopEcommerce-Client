import Cookies from 'js-cookie';
import { createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";
let userBaseUrl = import.meta.env.VITE_USER_API;
let adminrBaseUrl = import.meta.env.VITE_USER_API;

export const registerUser = createAsyncThunk(
  "users/registerUser",
  async ({ values, navigate, toast }, { rejectWithValue }) => {
    try {
      const response = await axios.post(`${userBaseUrl}/register`, values ,{withCredentials: true});
      if (response.status >= 200 && response.status < 300) {
        toast.success("Registration Successful");
        navigate("/login");
        return response.data;
      } else {
        toast.error("Unexpected response from the server");
        return rejectWithValue(response.data);
      }
    } catch (error) {
      if (error.response.status === 409) {
        toast.error("User already exist");
        navigate("/login");
      } else if (error.response.data.message || "Registration Failed") {
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
      const response = await axios.post(`${userBaseUrl}/login`, values);
      if (response.status >= 200 && response.status < 300) {
         Cookies.set('token',response.data.data.token)
        if (response.data.data.role === "admin") {
          toast.success(`Admin Loggin Success`);
          navigate("/admin");
          return response.data;
        } else {
          toast.success(`${response.data.data.user} Loggin Success`);
          navigate("/");
          return response.data;
        }
      }
    } catch (error) {
      if (error.response.status === 404) {
        toast.error("Invalid User. Create an account");
        navigate("/register");
      } else if ((error.response.status = 401)) {
        toast.error("Invalid Credentials");
      } else if (error.request) {
        toast.error("No response from the server. Please try again later.");
      } else {
        toast.error("An error occurred during registration");
      }
    }
  }
);

const id = localStorage.getItem("id");
export const loginUser = createAsyncThunk("products/loginUser", async () => {
  const response = await axios.get(`http://localhost:5000/users/${id}`);
  return response.data;
});
