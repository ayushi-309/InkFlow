import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";

const initialState = {
  allBlog: [],
  userBlogs: [],
  loading: false,
  error: null,
};

// Fetch All Blogs
export const getAllBlog = createAsyncThunk(
  "getAllBlog",
  async (_, { rejectWithValue }) => {
    try {
      const res = await axios.get("/api/blog/get-all-posts");
      return res.data;
    } catch (error) {
      return rejectWithValue(error);
    }
  },
);

// Fetch Single Blog
export const getSingleBlog = createAsyncThunk(
  "getSingleBlog",
  async (slug, { rejectWithValue }) => {
    try {
      const res = await axios.get(`/api/blog/posts/${slug}`);
      return res.data;
    } catch (error) {
      return rejectWithValue(error);
    }
  },
);

// Create Blog
export const createBlog = createAsyncThunk(
  "createBlog",
  async (data, { rejectWithValue }) => {
    try {
      const res = await axios.post("/api/blog/create-blog", data,{
        headers: {
          "Content-Type": "multipart/form-data",
        },
        withCredentials: true,
      });
      return res.data;
    } catch (error) {
      return rejectWithValue(error);
    }
  },
);

// Get User Posts
export const getUserPosts = createAsyncThunk(
  "getUserPosts",
  async (_, { rejectWithValue }) => {
    try {
      const res = await axios.get("/api/blog/get-user-blogs", {
        withCredentials: true,
      });
      return res.data;
    } catch (error) {
      return rejectWithValue(error);
    }
  },
);

// delete Blog
export const deleteBlog = createAsyncThunk(
  "deleteBlog",
  async (id, { rejectWithValue }) => {
    try {
      const res = await axios.delete(`/api/blog/delete-blog/${id}`, {
        withCredentials: true,
      });
      return res.data;
    } catch (error) {
      return rejectWithValue(error);
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

    // Create Blog
    builder.addCase(createBlog.pending, (state) => {
      state.loading = true;
    });
    builder.addCase(createBlog.fulfilled, (state, action) => {
      state.loading = false;
      state.createBlog = action.payload;
    });
    builder.addCase(createBlog.rejected, (state, action) => {
      state.loading = false;
      state.error = action.payload;
    });

    // Get User Posts
    builder.addCase(getUserPosts.pending, (state) => {
      state.loading = true;
    });
    builder.addCase(getUserPosts.fulfilled, (state, action) => {
      state.loading = false;
      state.userBlogs = action.payload;
    });
    builder.addCase(getUserPosts.rejected, (state, action) => {
      state.loading = false;
      state.error = action.payload;
    });

    // Delete Blog
    builder.addCase(deleteBlog.pending, (state) => {
      state.loading = true;
    });
    builder.addCase(deleteBlog.fulfilled, (state, action) => {
      state.loading = false;
      state.deleteBlog = action.payload;
    });
    builder.addCase(deleteBlog.rejected, (state, action) => {
      state.loading = false;
      state.error = action.payload;
    });
  },
});

export default blogSlice.reducer;
