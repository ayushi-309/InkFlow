import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import "./styles/index.css";
import App from "./App.jsx";
import { createBrowserRouter, RouterProvider } from "react-router-dom";
import { AuthProvider } from "./hooks/CustomLoginHook.jsx";
import {
  Home,
  BlogDetail,
  ForgetPassword,
  Login,
  Signup,
  AuthControler,
  Dashboard,
  Posts,
  User,
  CMS_Controler,
} from "./pages/index.js";
import { Provider } from "react-redux";
import { store } from "./app/Store.js";

const router = createBrowserRouter([
  {
    path: "/",
    element: <App />,
    children: [
      {
        path: "/",
        element: <Home />,
      },
      {
        path: "/blog-detail/:id",
        element: <BlogDetail />,
      },
    ],
  },
  {
    path: "/",
    element: <AuthControler />,
    children: [
      {
        path: "/login",
        element: <Login />,
      },
      {
        path: "/signup",
        element: <Signup />,
      },
      {
        path: "/forget-password",
        element: <ForgetPassword />,
      },
    ],
  },
  {
    path: "/",
    element: <CMS_Controler />,
    children: [
      {
        path: "/dashboard",
        element: <Dashboard />,
      },
      {
        path: "/posts",
        element: <Posts />,
      },
      {
        path: "/user",
        element: <User />,
      },
    ],
  },
]);

createRoot(document.getElementById("root")).render(
  <StrictMode>
    <Provider store={store}>
      <AuthProvider>
        <RouterProvider router={router} />
      </AuthProvider>
    </Provider>
  </StrictMode>
);
