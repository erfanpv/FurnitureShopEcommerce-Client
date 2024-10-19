  import { createAsyncThunk } from "@reduxjs/toolkit";
  import http from "../../../../utils/axios/axiosIntercepter";

  export const getWalletData = createAsyncThunk(
    "wallet/getWalletData",
    async (_, { rejectWithValue }) => {
      try {
        const userId = localStorage.getItem("id")
        const response = await http.get(`/users/wallet/${userId}`);
        return response.data
      } catch (error) {
        console.error("Error fetching wallet data:", error);
        rejectWithValue(response.data.data.message || "Failed")
      }
    }
  );
