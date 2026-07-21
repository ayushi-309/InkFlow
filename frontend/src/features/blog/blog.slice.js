import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";

const initialState = {
  allBlog: [],
  loading: false,
  error: null,
};

// Fetch All Blogs
export const getAllBlog = createAsyncThunk(
  "getAllBlog",
  async (_, rejectWithValue) => {
    try {
      const res = await axios.get("/api/blog/get-all-posts");
      return res.data;
    } catch (error) {
      rejectWithValue(error);
    }
  },
);

// Fetch Single Blog
export const getSingleBlog = createAsyncThunk(
  "getSingleBlog",
  async (slug, rejectWithValue) => {
    try {
      const res = await axios.get(`/api/blog/posts/${slug}`);
      return res.data;
    } catch (error) {
      rejectWithValue(error);
    }
  },
);

export const blogSlice = createSlice({
  name: "blog",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder.addCase(getAllBlog.pending, (state) => {
      state.loading = true;
    });
    builder.addCase(getAllBlog.fulfilled, (state, action) => {
      state.loading = false;
      state.allBlog = action.payload;
    });
    builder.addCase(getAllBlog.rejected, (state, action) => {
      state.loading = false;
      state.error = action.payload;
    });

    builder.addCase(getSingleBlog.pending, (state) => {
      state.loading = true;
    });
    builder.addCase(getSingleBlog.fulfilled, (state, action) => {
      state.loading = false;
      state.singleBlog = action.payload;
    });
    builder.addCase(getSingleBlog.rejected, (state, action) => {
      state.loading = false;
      state.error = action.payload;
    });
  },
});

export default blogSlice.reducer;
