import { createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";

export const fetchProducts = createAsyncThunk(
  "products/fetchProducts",
  async () => {
    const response = await axios.get("http://localhost:5000/products");
    return response.data;
  }
);

