import { configureStore } from "@reduxjs/toolkit";
import userReducer from "../features/user/user.slice.js";
import blogReducer from "../features/blog/blog.slice.js";

export const store = configureStore({
  reducer: {
    user: userReducer,
    blog: blogReducer,
  },
});
