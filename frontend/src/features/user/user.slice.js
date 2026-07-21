import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";

const initialState = {
  data: [],
  loading: false,
  error: null,
};

// Getting user data
export const getUser = createAsyncThunk(
  "user/getUser",
  async (_, { rejectWithValue }) => {
    try {
      const response = await axios.get("/api/user/current-user", {
        withCredentials: true,
      });
      return response.data;
    } catch (error) {
      return rejectWithValue(error.response.data);
    }
  },
);

// Login user
export const loginUser = createAsyncThunk(
  "user/loginUser",
  async (data, { rejectWithValue }) => {
    try {
      const response = await axios.post("/api/user/login", data, {
        headers: {
          "Content-Type": "application/json",
        },
      });
      return response.data;
    } catch (error) {
      return rejectWithValue(error.response.data);
    }
  },
);

// Logout user
export const logoutUser = createAsyncThunk(
  "user/logoutUser",
  async (_, { rejectWithValue }) => {
    try {
      const response = await axios.post("/api/user/logout", {
        withCredentials: true,
      });
      console.log("Logout response:", response.data);
      return response.data;
    } catch (error) {
      return rejectWithValue(error.response.data);
    }
  },
);

// Update user Profile Photo
export const updateProfilePhoto = createAsyncThunk(
  "user/updateProfilePhoto",
  async (data, { rejectWithValue }) => {
    try {
      const response = await axios.patch("/api/user/update-profile", data, {
        headers: {
          "Content-Type": "multipart/form-data",
        },
        withCredentials: true,
      });
      return response.data;
    } catch (error) {
      return rejectWithValue(error.response.data);
    }
  },
);

// Update User Detail
export const updateProfileDetail = createAsyncThunk(
  "user/updateProfileDetail",
  async (data, { rejectWithValue }) => {
    try {
      const response = await axios.patch("/api/user/update-details", data, {
        headers: {
          "Content-Type": "application/json",
        },
        withCredentials: true,
      });
      console.log("Update profile detail response:", response.data);
      return response.data;
    } catch (error) {
      return rejectWithValue(error.response.data);
    }
  },
);

export const userSlice = createSlice({
  name: "user",
  initialState,
  reducers: {
    logedUser: (state, action) => {
      state.data = action.payload;
    },
  },
  extraReducers: (builder) => {
    builder.addCase(getUser.pending, (state) => {
      state.loading = true;
      state.error = null;
    });
    builder.addCase(getUser.fulfilled, (state, action) => {
      state.loading = false;
      state.data = action.payload;
    });
    builder.addCase(getUser.rejected, (state, action) => {
      state.loading = false;
      state.error = action.payload;
    });

    builder.addCase(loginUser.pending, (state) => {
      state.loading = true;
      state.error = null;
    });
    builder.addCase(loginUser.fulfilled, (state, action) => {
      state.loading = false;
      state.data = action.payload;
    });
    builder.addCase(loginUser.rejected, (state, action) => {
      state.loading = false;
      state.error = action.payload;
    });

    builder.addCase(logoutUser.pending, (state) => {
      state.loading = true;
      state.error = null;
    });
    builder.addCase(logoutUser.fulfilled, (state) => {
      state.loading = false;
      state.data = null;
    });
    builder.addCase(logoutUser.rejected, (state, action) => {
      state.loading = false;
      state.error = action.payload;
    });

    // Update profile photo
    builder.addCase(updateProfilePhoto.pending, (state) => {
      state.loading = true;
      state.error = null;
    });
    builder.addCase(updateProfilePhoto.fulfilled, (state, action) => {
      state.loading = false;
      state.data = action.payload;
    });
    builder.addCase(updateProfilePhoto.rejected, (state, action) => {
      state.loading = false;
      state.error = action.payload;
    });

    // Update profile detail
    builder.addCase(updateProfileDetail.pending, (state) => {
      state.loading = true;
      state.error = null;
    });
    builder.addCase(updateProfileDetail.fulfilled, (state, action) => {
      state.loading = false;
      state.data = action.payload;
    });
    builder.addCase(updateProfileDetail.rejected, (state, action) => {
      state.loading = false;
      state.error = action.payload;
    });
  },
});

export const { logedUser } = userSlice.actions;
export default userSlice.reducer;
