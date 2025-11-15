import React from "react";
import { Link } from "react-router-dom";
import errorImg from "../assets/404-food.png"; // <-- use your fun image here

const NotFound = () => {
  return (
    <div className="min-h-screen flex flex-col items-center justify-center bg-white px-4 py-10 text-center">
      
      {/* Funny Image */}
      <img
        src={errorImg}
        alt="404 Not Found"
        className="w-60 sm:w-72 md:w-96 floating-image"
      />

      <h1 className="text-5xl sm:text-6xl font-extrabold text-orange-600 mt-6">
        404
      </h1>

      <p className="text-gray-700 text-lg sm:text-xl mt-2 max-w-md">
        Oops! Looks like this page got lost in the kitchen! 🍔  
        The page you're looking for doesn't exist.
      </p>

      <Link
        to="/"
        className="btn bg-orange-600 hover:bg-orange-700 text-white mt-6 px-6 py-3 text-lg rounded-xl"
      >
        Back to Home
      </Link>

      {/* Floating Animation */}
      <style>{`
        @keyframes float {
          0% { transform: translateY(0px); }
          50% { transform: translateY(-12px); }
          100% { transform: translateY(0px); }
        }
        .floating-image {
          animation: float 3s ease-in-out infinite;
        }
      `}</style>
    </div>
  );
};

export default NotFound;
