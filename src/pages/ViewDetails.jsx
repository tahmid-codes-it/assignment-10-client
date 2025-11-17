import React, { useState } from "react";
import { useLoaderData, Link } from "react-router-dom";
import { FaUserCircle, FaMapMarkerAlt, FaStar, FaHeart } from "react-icons/fa";

const ViewDetails = () => {
  const review = useLoaderData();
  const [fav, setFav] = useState(false);

  if (!review) {
    return (
      <p className="text-center text-gray-500 text-lg mt-10">
        Review data not found.
      </p>
    );
  }

  return (
    <div className="max-w-4xl mx-auto px-6 py-10">
      {/* HEADER IMAGE */}
      <div className="relative">
        <img
          src={review.photo_url}
          alt="Food"
          className="w-full h-80 object-cover rounded-xl shadow"
        />

        {/* Favorite Icon */}
        <button
          onClick={() => setFav(!fav)}
          className="absolute top-5 right-5 text-3xl transition"
        >
          <FaHeart className={fav ? "text-red-500" : "text-white"} />
        </button>
      </div>

      {/* CONTENT */}
      <div className="bg-white rounded-xl shadow p-6 mt-6">
        {/* Reviewer */}
        <div className="flex items-center gap-3 mb-4">
          <FaUserCircle className="text-4xl text-orange-500" />
          <div>
            <p className="font-semibold text-lg">{review.reviewer_name}</p>
          </div>
        </div>

        {/* Food Name */}
        <h2 className="text-2xl font-bold mb-1">{review.food_name}</h2>

        {/* Restaurant Name */}
        <p className="text-orange-600 font-semibold mb-1">
          {review.restaurant_name}
        </p>

        {/* Location */}
        <p className="flex items-center text-gray-600 mb-3">
          <FaMapMarkerAlt className="mr-2 text-orange-500" />
          {review.restaurant_location}
        </p>

        {/* Rating */}
        <p className="flex items-center gap-2 text-yellow-500 font-semibold mb-4">
          <FaStar /> {review.rating} / 5
        </p>

        {/* Full Review */}
        <p className="text-gray-700 leading-relaxed mb-6">
          {review.review}
        </p>

        {/* Back Button */}
        <Link to="/all-reviews">
          <button className="bg-orange-600 hover:bg-orange-700 text-white px-5 py-2 rounded shadow">
            ← Back to All Reviews
          </button>
        </Link>
      </div>
    </div>
  );
};

export default ViewDetails;
