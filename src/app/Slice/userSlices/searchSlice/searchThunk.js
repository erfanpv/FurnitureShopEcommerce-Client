// import { createAsyncThunk } from "@reduxjs/toolkit";
// import axios from "axios";

// const userBaseUrl = import.meta.env.VITE_USER_API;

// export const searchProductsUsers = createAsyncThunk(
//   "search/searchProductsUsers",
//   async ({ query }, { rejectWithValue }) => {
//     try {
//       // Correct way to pass query parameters in a GET request
//       const response = await axios.get(`${userBaseUrl}/search/products`, {
//         params: { searchQuery: query },
//       });

//       console.log(response);

//       return response.data.data;
//     } catch (error) {
//       console.log(error.response.data);

//       return rejectWithValue(
//         error.response.data.message || "Failed to fetch the product."
//       );
//     }
//   }
// );
