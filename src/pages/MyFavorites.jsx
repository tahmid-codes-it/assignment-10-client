import React, { useEffect, useState } from "react";

const MyFavorites = () => {
  const [favorites, setFavorites] = useState([]);

  // Load saved favorites
  useEffect(() => {
    const saved = JSON.parse(localStorage.getItem("favorites"));
    if (saved && saved.length > 0) {
      setFavorites(saved);
    }
  }, []);

  // Remove a favorite by ID
  const removeFavorite = (id) => {
    const updated = favorites.filter((item) => item._id !== id);

    setFavorites(updated);
    localStorage.setItem("favorites", JSON.stringify(updated));
  };

  return (
    <div className="max-w-6xl mx-auto px-6 py-10">
      <h1 className="text-3xl font-bold text-red-500 mb-10 text-center">
        My Favorite Reviews ❤️
      </h1>

      {favorites.length > 0 ? (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {favorites.map((review) => (
            <div
              key={review._id}
              className="bg-white shadow-lg rounded-xl p-5 relative"
            >
              {/* IMAGE */}
              <img
                src={
                  review.photo_url ||
                  "https://via.placeholder.com/300x200?text=No+Image"
                }
                alt=""
                className="w-full h-48 object-cover rounded"
              />

              {/* TEXT */}
              <h2 className="text-xl font-bold mt-3">{review.food_name}</h2>
              <p className="text-gray-600">{review.reviewer_name}</p>

              {/* REMOVE BUTTON */}
              <button
                onClick={() => removeFavorite(review._id)}
                className="mt-4 bg-red-500 text-white px-4 py-2 rounded hover:bg-red-600 w-full"
              >
                Remove from Favorites
              </button>
            </div>
          ))}
        </div>
      ) : (
        <p className="text-center text-gray-500 text-lg mt-10">
          No favorites added yet 😔
        </p>
      )}
    </div>
  );
};

export default MyFavorites;
