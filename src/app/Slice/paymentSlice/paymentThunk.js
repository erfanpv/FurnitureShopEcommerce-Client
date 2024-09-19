import { createAsyncThunk } from "@reduxjs/toolkit";
import http from "../../../utils/axios/axiosIntercepter";
import { useNavigate } from "react-router-dom";


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
    const navigate = useNavigate()
    try {
      const id = localStorage.getItem("id");
      const response = await http.get(`/users/payment/success/${id}`);
      console.log(response.data);
      
      if (response.data.success) {
        navigate(`/payment/success/payment`)
      }
      
      return response.data.data;
    } catch (error) {
      return rejectWithValue(error.response.data.message || "Failed.");
    }
  }
);
