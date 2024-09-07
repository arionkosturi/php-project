// @ts-nocheck
import React from "react";
import ReactDOM from "react-dom/client";
import { createBrowserRouter, RouterProvider } from "react-router-dom";
import "./index.css";
import "@radix-ui/themes/styles.css";
import Home from "./frontend/Home";
import Categories from "./components/Pages/Categories";
import Category from "./components/Pages/Category";
import PublicCategory from "./frontend/Category";
import NotFoundPage from "./components/Pages/NotFoundPage";
import ProductForm from "./components/ProductForm";
import EditProduct from "./components/Pages/EditProduct";
import Dashboard from "./components/Pages/Dashboard";
import Users from "./components/Pages/Users";
import ProductP from "./components/Pages/Product";
import Product from "./frontend/Product";
import PublishedProducts from "./components/Pages/PublishedProducts";
import Reklama from "./components/Pages/Reklama";
import Login from "./frontend/Login";
import Register from "./frontend/Register";
import Profile from "./frontend/Profile";
import Saved from "./frontend/Saved";
import Liked from "./frontend/Liked";
import Cart from "./frontend/Cart";
import Orders from "./frontend/Orders";
import Order from "./frontend/Order";
import { QueryClientProvider, QueryClient } from "@tanstack/react-query";
import { ReactQueryDevtools } from "@tanstack/react-query-devtools";

const queryClient = new QueryClient();
const root = ReactDOM.createRoot(document.getElementById("root"));

const router = createBrowserRouter([
  {
    path: "/",
    element: <Home />,
    errorElement: <NotFoundPage />,
  },
  {
    path: "/product",
    element: <Product />,
    errorElement: <NotFoundPage />,
  },
  {
    path: "/cart",
    element: <Cart />,
    errorElement: <NotFoundPage />,
  },

  {
    path: "/order",
    element: <Order />,
    errorElement: <NotFoundPage />,
  },
  {
    path: "/orders",
    element: <Orders />,
    errorElement: <NotFoundPage />,
  },
  {
    path: "/category/:category",
    element: <PublicCategory />,
    errorElement: <NotFoundPage />,
  },
  {
    path: "/dashboard/new",
    element: <ProductForm />,
    errorElement: <NotFoundPage />,
  },
  {
    path: "/dashboard/users",
    element: <Users />,
    errorElement: <NotFoundPage />,
  },
  {
    path: "/dashboard/reklama",
    element: <Reklama />,
    errorElement: <NotFoundPage />,
  },
  {
    path: "/dashboard/edit",
    element: <EditProduct />,
    errorElement: <NotFoundPage />,
  },
  {
    path: "/dashboard/all",
    element: <Dashboard />,
    errorElement: <NotFoundPage />,
  },
  {
    path: "/dashboard/",
    element: <Dashboard />,
    errorElement: <NotFoundPage />,
  },
  {
    path: "/dashboard/product",
    element: <ProductP />,
    errorElement: <NotFoundPage />,
  },
  {
    path: "/dashboard/published",
    element: <PublishedProducts />,
    errorElement: <NotFoundPage />,
  },
  {
    path: "/profile",
    element: <Profile />,
  },
  {
    path: "/saved",
    element: <Saved />,
  },
  {
    path: "/liked",
    element: <Liked />,
  },
  {
    path: "/login",
    element: <Login />,
  },
  {
    path: "/register",
    element: <Register />,
  },
  {
    path: "/dashboard/categories",
    element: <Categories />,
    errorElement: <NotFoundPage />,
  },
  {
    path: "/dashboard/category/",
    element: <Category />,
    errorElement: <NotFoundPage />,
  },
]);

root.render(
  <React.StrictMode>
    <QueryClientProvider client={queryClient}>
      <RouterProvider router={router} />
      <ReactQueryDevtools initialIsOpen={false} />
    </QueryClientProvider>
  </React.StrictMode>
);
