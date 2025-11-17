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
import AboutUs from "../pages/AboutUs";
import MyFavorites from "../pages/MyFavorites";
import ViewDetails from "../pages/viewDetails";
import PrivateRoute from "./PrivateRoute";
import AddReview from "../pages/AddReview";

const router = createBrowserRouter([
  {
    path: "/", // Root layout
    element: <MainLayout />, // Navbar + Footer live here
    children: [
      {
        path: "/", // Default route
        element: <Home />,
        loader: () => fetch('http://localhost:3000/Reviewer')
      },
      {
        path: "/all-reviews",
        element: <AllReviews></AllReviews>,
        loader: ()=>fetch('http://localhost:3000/Reviewer')
      },
      {
        path: "/my-favorites",
        element: <MyFavorites></MyFavorites>
      },
      {
        path: "/about-us",
        element: <AboutUs></AboutUs>,
      },
      {
  path: "/review/:id",
  element: <ViewDetails />,
  loader: ({ params }) =>
    fetch(`http://localhost:3000/review/${params.id}`)
},
      {
        path: "/my-reviews",
        element: <MyReviews></MyReviews> 
      },
      {
  path: "/add-review",
  element: (
    <PrivateRoute>
      <AddReview />
    </PrivateRoute>
  ),
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
