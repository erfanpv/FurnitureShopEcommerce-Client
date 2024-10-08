import { createSlice } from "@reduxjs/toolkit";
import { registerUser, loginUsers } from "./userThunk";

const userSlice = createSlice({
  name: "users",
  initialState: {
    loading: false,
    error: null,
    user: null,
    isLoggedIn: false,
  },
  reducers: {
    setLoggedIn: (state, action) => {
      state.isLoggedIn = action.payload;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(registerUser.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(registerUser.fulfilled, (state, action) => {
        state.loading = false;
      })
      .addCase(registerUser.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      })
      .addCase(loginUsers.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(loginUsers.fulfilled, (state, action) => {
        state.loading = false;
        state.isLoggedIn = true;
      })
      .addCase(loginUsers.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      })
      // .addCase(loginUser.fulfilled, (state, action) => {
      //   state.user = action.payload;
      // })
      // .addCase(loginUser.rejected, (state, action) => {});
  },
});

export const { setLoggedIn } = userSlice.actions;
export default userSlice.reducer;
