import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import axios from "axios";

export const fetchCart = createAsyncThunk("cart/fetchCart", async () => {
  try {
    const id = localStorage.getItem("id");
    const res = await axios.get(`http://localhost:5000/users/${id}`);
    return res.data.cart;
  } catch (error) {
    console.log("Failed to fetch cart:", error);
    throw error;
  }
});

export const addToCartAsync = createAsyncThunk(
  "cart/addToCartAsync",
  async (product, { getState }) => {
    try {
      const state = getState();
      const id = localStorage.getItem("id");
      let userCart = [...state.cart.cart];

      const existingProductIndex = userCart.findIndex(
        (item) => item.id === product.id
      );

      if (existingProductIndex !== -1) {
        userCart = userCart.map((item, index) => {
          if (index === existingProductIndex) {
            return { ...item, qty: item.qty + product.quantity };
          }
          return item;
        });
      } else {
        userCart.push({ ...product, qty: product.quantity });
      }

      await axios.patch(`http://localhost:5000/users/${id}`, {
        cart: userCart,
      });

      return userCart;
    } catch (error) {
      console.log("Failed to add to cart:", error);
      throw error;
    }
  }
);

export const removeFromCartAsync = createAsyncThunk(
  "cart/removeFromCartAsync",
  async (productId, { getState }) => {
    try {
      const state = getState();
      const id = localStorage.getItem("id");
      const userCart = state.cart.cart.filter((item) => item.id !== productId);

      await axios.patch(`http://localhost:5000/users/${id}`, {
        cart: userCart,
      });
      return userCart;
    } catch (error) {
      console.log("Failed to remove from cart:", error);
      throw error;
    }
  }
);

export const quantityIncrementAsync = createAsyncThunk(
  "cart/quantityIncrementAsync",
  async (productId, { getState }) => {
    try {
      const state = getState();
      const id = localStorage.getItem("id");
      const updatedCart = state.cart.cart.map((item) => {
        if (item.id === productId) {
          return { ...item, qty: item.qty + 1 };
        }
        return item;
      });

      await axios.patch(`http://localhost:5000/users/${id}`, {
        cart: updatedCart,
      });
      return updatedCart;
    } catch (error) {
      console.log("Failed to increment quantity:", error);
      throw error;
    }
  }
);

export const quantityDecrementAsync = createAsyncThunk(
  "cart/quantityDecrementAsync",
  async (productId, { getState }) => {
    try {
      const state = getState();
      const id = localStorage.getItem("id");
      const updatedCart = state.cart.cart.map((item) => {
        if (item.id === productId && item.qty > 1) {
          return { ...item, qty: item.qty - 1 };
        }
        return item;
      });

      await axios.patch(`http://localhost:5000/users/${id}`, {
        cart: updatedCart,
      });
      return updatedCart;
    } catch (error) {
      console.log("Failed to decrement quantity:", error);
      throw error;
    }
  }
);


// Slice
const cartSlice = createSlice({
  name: "cart",
  initialState: {
    cart: [],
    loading: false,
    error: null,
  },
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(fetchCart.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchCart.fulfilled, (state, action) => {
        state.loading = false;
        state.cart = action.payload;
        console.log("succeess", action.payload);
      })
      .addCase(fetchCart.rejected, (state, action) => {
        state.loading = false;
        state.error = action.error.message;
      })
      .addCase(addToCartAsync.fulfilled, (state, action) => {
        state.cart = action.payload;
        console.log("succeess ab", action.payload);
      })
      .addCase(removeFromCartAsync.fulfilled, (state, action) => {
        state.cart = action.payload;
      })
      .addCase(quantityIncrementAsync.fulfilled, (state, action) => {
        state.cart = action.payload;
      })
      .addCase(quantityDecrementAsync.fulfilled, (state, action) => {
        state.cart = action.payload;
      });
  },
});

export default cartSlice.reducer;

export const {
  addToCart,
  removeFromCart,
  quantityIncrement,
  quantityDecrement,
} = cartSlice.actions;
