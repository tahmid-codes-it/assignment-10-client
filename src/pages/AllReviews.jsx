import React, { useState, useEffect } from "react";
import { useLoaderData, Link } from "react-router-dom";
import { FaUserCircle, FaMapMarkerAlt, FaStar, FaHeart } from "react-icons/fa";

const AllReviews = () => {
  const reviews = useLoaderData() || [];

  const [favorites, setFavorites] = useState([]);

  // Load favorites ONCE from localStorage (if any)
  useEffect(() => {
    const saved = JSON.parse(localStorage.getItem("favorites"));
    if (saved && saved.length > 0) {
      setFavorites(saved);
    }
  }, []);

  // Save ONLY when favorites contains items
  useEffect(() => {
    if (favorites.length > 0) {
      localStorage.setItem("favorites", JSON.stringify(favorites));
    }
  }, [favorites]);

  // Toggle Add / Remove
  const toggleFavorite = (review) => {
    setFavorites((prev) => {
      const exists = prev.some((item) => item._id === review._id);
      return exists
        ? prev.filter((item) => item._id !== review._id)
        : [...prev, review];
    });
  };

  const isFavorite = (id) => favorites.some((item) => item._id === id);

  return (
    <div className="max-w-6xl mx-auto px-6 py-10">
      <h1 className="text-3xl font-bold text-orange-500 mb-10 text-center">
        All Foodie Reviews
      </h1>

      {reviews.length > 0 ? (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {reviews.map((review) => (
            <div
              key={review._id}
              className="bg-white shadow-lg rounded-xl overflow-hidden hover:shadow-2xl transition duration-300 relative"
            >
              {/* Favorite Button */}
              <button
                onClick={() => toggleFavorite(review)}
                className="absolute top-3 right-3 bg-white p-2 rounded-full shadow-md z-20"
              >
                <FaHeart
                  size={20}
                  className={
                    isFavorite(review._id)
                      ? "text-red-600"
                      : "text-gray-300"
                  }
                />
              </button>

              {/* IMAGE */}
              <img
                src={
                  review.photo_url ||
                  "https://via.placeholder.com/300x200?text=No+Image"
                }
                alt={review.food_name}
                className="w-full h-52 object-cover"
              />

              <div className="p-5">
                {/* REVIEWER */}
                <div className="flex items-center gap-3 mb-4">
                  <FaUserCircle className="text-4xl text-orange-400" />
                  <p className="font-semibold">{review.reviewer_name}</p>
                </div>

                {/* FOOD NAME */}
                <h2 className="text-xl font-bold mb-1">{review.food_name}</h2>

                {/* RESTAURANT NAME */}
                <p className="text-orange-600 font-semibold mb-1">
                  {review.restaurant_name}
                </p>

                {/* LOCATION */}
                <p className="flex items-center text-gray-600 text-sm mb-3">
                  <FaMapMarkerAlt className="mr-2 text-orange-500" />
                  {review.restaurant_location}
                </p>

                {/* RATING */}
                <p className="flex items-center gap-2 text-yellow-500 font-semibold mb-3">
                  <FaStar /> {review.rating} / 5
                </p>

                {/* REVIEW SHORT TEXT */}
                <p className="text-gray-700 text-sm mb-4">
                  {review.review?.slice(0, 130)}...
                </p>

                <Link to={`/review/${review._id}`}>
                  <button className="bg-orange-600 text-white px-4 py-2 rounded hover:bg-orange-700 w-full">
                    View Details
                  </button>
                </Link>
              </div>
            </div>
          ))}
        </div>
      ) : (
        <p className="text-center text-gray-500 text-lg mt-10">
          No reviews found 😔
        </p>
      )}
    </div>
  );
};

export default AllReviews;
