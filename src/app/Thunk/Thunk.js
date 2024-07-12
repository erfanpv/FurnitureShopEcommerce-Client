import { createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";
import { toast } from "react-toastify";

export const fetchProducts = createAsyncThunk(
  "products/fetchProducts",
  async () => {
    const response = await axios.get("http://localhost:5000/products");
    return response.data;
  }
);

export const fetchSingleProducts = createAsyncThunk(
  "products/fetchSingleProducts",
  async (id) => {
    const response = await axios.get(`http://localhost:5000/products/${id}`);
    return response.data;
  }
);

export const registerUser = createAsyncThunk(
  "users/registerUser",
  async ({ values, navigate, toast }) => {
    try {
      const { data: userData } = await axios.get("http://localhost:5000/users");
      const existEmail = userData.find((user) => user.email === values.email);

      if (existEmail) {
        toast.error("The email already exists");
        navigate("/login");
      } else {
        const response = await axios.post(
          "http://localhost:5000/users",
          JSON.stringify(values),
          {
            headers: {
              "Content-Type": "application/json",
            },
          }
        );
        toast.success("Registered Successfully");
        navigate("/login");
        return response.data;
      }
    } catch (error) {
      toast.error("Registration Failed");
    }
  }
);

export const loginUser = createAsyncThunk(
  "users/loginUser",
  async ({ values, navigate, toast }) => {
    try {
      const { data: users } = await axios.get("http://localhost:5000/users");
      const inputUser = users.find(
        (user) =>
          user.email === values.email && user.password === values.password
      );

      if (inputUser) {
        toast.success("Successfully Login");
        localStorage.setItem("id", inputUser.id);

        if (
          inputUser.email === "erfanpv786@gmail.com" &&
          inputUser.password === "Erfan@123"
        ) {
          navigate("/admin");
        } else {
          navigate("/");
        }
        return inputUser;
      } else {
        toast.error("Invalid Credentials");
      }
    } catch (error) {
      toast.error("Internal Server Down");
    }
  }
);

export const fetchCart = createAsyncThunk("products/fetchCart", async (id) => {
  const response = await axios.get(`http://localhost:5000/users/${id}`);
  return response.data.cart;
});


