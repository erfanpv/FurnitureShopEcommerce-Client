import { createAsyncThunk } from "@reduxjs/toolkit";
import http from "../../../utils/axios/axiosIntercepter";

export const stripePaymentIntegration = async ({ cartId }) => {
  try {
    
    const id = localStorage.getItem("id");
    
    const response = await http.post(`/users/payment/${id}`, { cartId });
    
    if (response.data.url) {
      window.location.href = response.data.url;
    } else {
      console.log("No URL provided in the response");
    }
  } catch (error) {
    console.log("Error:", error);
  }
};


export const stripePaymentSuccess = createAsyncThunk(
  "payment/stripePaymentSuccess",
  async (_, { rejectWithValue }) => {
    try {
      
      const response = await http.get(`/payment/success/:id`);
      console.log();
      
      return response.data.data;
    } catch (error) {
      return rejectWithValue(error.response.data.message || "Failed to fetch products.");
    }
  }
);
