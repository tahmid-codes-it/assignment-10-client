// routes/Router.jsx
import { createBrowserRouter } from "react-router-dom";
import MainLayout from "../layout/MainLayout";

// Pages
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
import EditReview from "../pages/EditReview";

const router = createBrowserRouter([
  {
    path: "/",
    element: <MainLayout />,
    errorElement: <ErrorPage />,
    children: [
      {
        index: true,
        element: <Home />,
        loader: () => fetch("http://localhost:3000/reviews/top"),
      },
      {
        path: "all-reviews",
        element: <AllReviews />,
        loader: () => fetch("http://localhost:3000/reviews"),
      },
      {
        path: "review/:id",
        element: <ViewDetails />,
        loader: ({ params }) => fetch(`http://localhost:3000/reviews/${params.id}`),
      },
      {
        path: "my-reviews",
        element: (
          <PrivateRoute>
            <MyReviews />
          </PrivateRoute>
        ),
      },
      {
        path: "add-review",
        element: (
          <PrivateRoute>
            <AddReview />
          </PrivateRoute>
        ),
      },
      {
        path: "edit-review/:id",
        element: (
          <PrivateRoute>
            <EditReview />
          </PrivateRoute>
        ),
      },
      {
        path: "my-favorites",
        element: (
          <PrivateRoute>
            <MyFavorites />
          </PrivateRoute>
        ),
      },
      {
        path: "about-us",
        element: <AboutUs />,
      },
    ],
  },

  // AUTH ROUTES
  {
    path: "/sign-in",
    element: <SignIn />,
  },
  {
    path: "/sign-up",
    element: <SignUp />,
  },

  // 404
  {
    path: "*",
    element: <ErrorPage />,
  },
]);

export default router;
