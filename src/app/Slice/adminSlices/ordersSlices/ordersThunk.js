import { createAsyncThunk } from "@reduxjs/toolkit";
import http from "../../../../utils/axios/axiosIntercepter";

export const getAllordersData = createAsyncThunk(
  "orders/getAllordersData",
  async ({ page = 1, limit = 10, status }, { rejectWithValue }) => {
    try {
      const response = await http.get(`/admin/orders`, {
        params: {
          page,
          limit,
          status
        },
      });


      return {
        orders: response.data.data, 
        pagination: response.data.pagination, 
      };
    } catch (error) {
      return rejectWithValue(
        error.response?.data?.message || "Failed to fetch orders."
      );
    }
  }
);


// export const ordersDataByUser = createAsyncThunk(
//   "orders/ordersDataByUser",
//   async ({ id }, { rejectWithValue }) => {
//     try {
//       const response = await http.get(`/users/orders/${id}`);

//       if (response.data.success) {
//         return response.data.data.orderDetails || []; 
//       } else {
//         return rejectWithValue(response.data.message || "No orders found.");
//       }
      
//     } catch (error) {
//       return rejectWithValue(error.response?.data?.message || "Failed to fetch orders.");
//     }
//   }
// );

export const ordersDataByUserForAdmin = createAsyncThunk(
  "orders/ordersDataByUser",
  async ({ id }, { rejectWithValue }) => {
    try {
      const response = await http.get(`/users/orders/${id}`);

      if (response.data.success) {
        return response.data.data.orderDetails || []; 
      } else {
        return rejectWithValue(response.data.message || "No orders found.");
      }
      
    } catch (error) {
      return rejectWithValue(error.response?.data?.message || "Failed to fetch orders.");
    }
  }
);


export const updateOrderStatus = createAsyncThunk(
  "orders/updateOrderStatus",
  async ({ orderId, status ,currentPage ,ordersPerPage , dispatch }, { rejectWithValue }) => {
    try {
      const response = await http.put(`/admin/orders/${orderId}/status`, { status });
       if (response.data) {
        dispatch(getAllordersData({ page: currentPage, limit: ordersPerPage  }));
      }
    } catch (error) {
      return rejectWithValue(error.response.data);
    }
  }
);


export const rejectCancelOrReturnRequest = createAsyncThunk(
  "orders/rejectCancelOrReturnRequest",
  async ({ orderId, modalType ,currentPage ,ordersPerPage , dispatch }, { rejectWithValue }) => {
    try {
      const action = modalType
      
      const response = await http.put(`/admin/orders/reject/${orderId}`, { action });
      console.log(response.data)
      //  if (response.data) {
      //   dispatch(getAllordersData({ page: currentPage, limit: ordersPerPage  }));
      // }
    } catch (error) {
      return rejectWithValue(error.response.data);
    }
  }
);
