import { createAsyncThunk } from "@reduxjs/toolkit";
import http from "../../../utils/axios/axiosIntercepter";


const id = localStorage.getItem("id");

export const fetchCart = createAsyncThunk("cart/fetchCart", async (_, { rejectWithValue }) => {
  try {
    const id = localStorage.getItem("id");

    if (!id) {
      return rejectWithValue("User ID not found.");
    }

    const response = await http.get(`/users/${id}/cart`);

    if (response.data.success && response.data.data.length === 0) {
      return { cartProduct: [], cartId: response.data.cartId }; 
    }

    return { cartProduct: response.data.data, cartId: response.data.cartId };
  } catch (error) {
    return rejectWithValue(error.response?.data?.message || "Failed to fetch the cart");
  }
});



export const addToCartAsync = createAsyncThunk(
  "cart/addToCartAsync",
  async ({ productId, quantity, navigate, toast }, { rejectWithValue }) => {
    try {
      const id = localStorage.getItem("id");

      const response = await http.post(`/users/${id}/cart`, { productId, quantity });
            
      toast.success("Product added to cart successfully");
      navigate("/products/cart/mycart");

      return response.data.data.cart.products
    } catch (error) { 
      console.log("Failed to add to cart:", error);
      return rejectWithValue(error.response?.data?.message || "Failed to add product to cart");
    }
  }
);


export const removeFromCartAsync = createAsyncThunk(
  "cart/removeFromCartAsync",
  async ( productId , { rejectWithValue }) => { 
    try {
      const response = await http.delete(`/users/${id}/cart`, { data: { productId } });
      return response.data.cart.products;
    } catch (error) {
      return rejectWithValue(error.response?.data?.message || "Failed to remove product from cart");
    }
  }
);

export const quantityIncrementAsync = createAsyncThunk(
  "cart/quantityIncrementAsync",
  async (productId, { rejectWithValue }) => {
    try {
      const action = "increment"; 

      const response = await http.post(`/users/${id}/cart`, { productId, action });
      
      return response.data.cart.products;
    } catch (error) {
      return rejectWithValue( error.response?.data?.message || "Failed to increment product quantity in cart");
    }
  }
);


export const quantityDecrementAsync = createAsyncThunk(
  "cart/quantityDecrementAsync",
  async ( productId , { rejectWithValue }) => {
    try {
      const action = "decrement";

      const response = await http.post(`/users/${id}/cart`, { productId, action });

      return response.data.cart.products;
    } catch (error) {
      return rejectWithValue(
        error.response?.data?.message || "Failed to decrement product quantity in cart"
      );
    }
  }
);








