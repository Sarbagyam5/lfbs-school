import loginReq from "@/utils/axios/axios";
import { createAsyncThunk } from "@reduxjs/toolkit";

const loginUser = createAsyncThunk(
  "auth/login",
  async (data, { rejectWithValue }) => {
    try {
      const user = await loginReq(data);
      sessionStorage.setItem("authToken", user.data.token);
      return user.data;
    } catch (error) {}
  }
);
