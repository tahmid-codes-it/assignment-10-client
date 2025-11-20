import React, { useEffect, useState } from "react";

const MyFavorites = () => {
  const [favorites, setFavorites] = useState([]);

  // Load ONLY IF saved favorites exist
  useEffect(() => {
    const saved = JSON.parse(localStorage.getItem("favorites"));
    if (saved && saved.length > 0) {
      setFavorites(saved);
    }
  }, []);

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
              className="bg-white shadow-lg rounded-xl p-5"
            >
              <img
                src={
                  review.photo_url ||
                  "https://via.placeholder.com/300x200?text=No+Image"
                }
                alt=""
                className="w-full h-48 object-cover rounded"
              />
              <h2 className="text-xl font-bold mt-3">{review.food_name}</h2>
              <p className="text-gray-600">{review.reviewer_name}</p>
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
