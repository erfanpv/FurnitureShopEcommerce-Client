import { createAsyncThunk } from "@reduxjs/toolkit";
import http from "../../../../utils/axios/axiosIntercepter";

export const sendMessage = createAsyncThunk(
  "contact/sendMessage",
  async ({ values, toast, resetForm }) => {
    try {
      const id = localStorage.getItem("id");
      let contactData = values;
      const response = await http.post(`/users/${id}/contact`, { contactData });
      console.log(response.status);
      if (response.status >= 200 && response.status < 300) {
        toast.success("Message sent successfully!");
        resetForm();
      }
    } catch (error) {
      toast.success("Message sent not success");
      console.log(error);
    }
  }
);

export const getAllUserMessages = createAsyncThunk(
  "contact/getAllUserMessages",
  async (_, { rejectWithValue }) => {
    try {
      const response = await http.get(`/admin/all-contact`,);
      if (response.status >= 200 && response.status < 300) {
        return response.data.data
      } else {
        throw new Error("Failed to fetch messages");
      }
    } catch (error) {
      rejectWithValue(error?.response?.data?.message || "Error fetching messages")
    }
  }
);


export const getPendingContactCount =  createAsyncThunk(
  "contact/getPendingContactCount", 
  async (_,{rejectWithValue}) => {
    try {
      const response = await http.get(`/admin/pending-contact-count`);

      if (response.status >= 200 && response.status < 300) {
        return response.data.pendingMessageCount
      } else {
        throw new Error("Failed to fetch messages");
      }
    } catch (error) {
      rejectWithValue(error?.response?.data?.message || "Error fetching Count")
    }
  }
)


export const messageStatusUpdate =  createAsyncThunk(
  "contact/messageStatusUpdate", 
  async ({messageId, newStatus,dispatch,setUpdatingStatus,closeModal},{rejectWithValue}) => {
    try {
      setUpdatingStatus(true)
      const response =  await http.put(`/admin/messages/update-status/${messageId}`, { newStatus });
      if (response.status >= 200 && response.status < 300) {
        dispatch(getAllUserMessages())
        dispatch(getPendingContactCount())
        setUpdatingStatus(false)
        closeModal()
      }else {
        throw new Error("Failed to fetch messages");
      }

    } catch (error) {
      setUpdatingStatus(false)
      rejectWithValue(error?.response?.data?.message || "Error")
    }
  }
)
