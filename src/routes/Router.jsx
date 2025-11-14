// routes/Router.jsx
import { createBrowserRouter } from "react-router";
import MainLayout from "../layout/MainLayout";

// Import your pages
import Home from "../pages/Home";
import ErrorPage from "../pages/ErrorPage";

import AllReviews from "../pages/AllReviews";
import SignUp from "../pages/SignUp";
import SignIn from "../pages/SignIn";
import MyReviews from "../pages/MyReviews";

const router = createBrowserRouter([
  {
    path: "/", // Root layout
    element: <MainLayout />, // Navbar + Footer live here
    children: [
      {
        path: "/", // Default route
        element: <Home />,
      },
      {
        path: "/all-reviews",
        element: <AllReviews></AllReviews>,
      },
      {
        path: "/my-reviews",
        element: <MyReviews></MyReviews> 
      },
      {
        path: "*",
        element: <ErrorPage />,
      },
      {
        path: "/sign-up",
        element: <SignUp></SignUp>, // No Navbar/Footer layout
      },
      {
        path: "/sign-in",
        element: <SignIn></SignIn>, 
      }
    ],
  },
]);

export default router;
