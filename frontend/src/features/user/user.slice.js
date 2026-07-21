import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";

const initialState = {
  data: [],
  loading: false,
  error: null,
};

export const userSlice = createSlice({
  name: "user",
  initialState,
  reducers: {
    logedUser: (state, action) => {
      state.data = action.payload;
    }
  },
  extraReducers: (builder) => {},
});

export const { logedUser } = userSlice.actions;
export default userSlice.reducer;
